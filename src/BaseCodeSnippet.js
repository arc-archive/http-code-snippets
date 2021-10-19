/**
@license
Copyright 2018 The Advanced REST client authors <arc@mulesoft.com>
Licensed under the Apache License, Version 2.0 (the "License"); you may not
use this file except in compliance with the License. You may obtain a copy of
the License at
http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
License for the specific language governing permissions and limitations under
the License.
*/
import { LitElement, html } from 'lit-element';
import { PrismHighlighter } from '@advanced-rest-client/highlight';
import httpStyles from './BaseStyles.js';

/** @typedef {import('./BaseCodeSnippet').UrlDetails} UrlDetails */

const URI_CACHE = {};

export const highlighter = Symbol('highlighter');
export const highlightHandler = Symbol('highlightHandler');

/**
 * `base-code-snippet`
 *
 * A class to be used to extend other code snippets elements.
 *
 * Each child class has to have `lang` property to be used to recognize the
 * syntax. If syntax is different than the default PrismJs set then it has to
 * be imported into the DOM.
 *
 * Each child class must implement `_processCommand()` function which results
 * to a code to highlight. It takes 4 attributes (in order): url, method,
 * headers, and payload.
 * Mind that all arguments are optional.
 *
 * If the child class implements it's own template, it should contain
 * `<code></code>` inside the template where the highlighted value is
 * added.
 *
 * Parent element, presumably `http-code-snippets`, or main document
 * must include `prism-element/prism-highlighter.html` in it's DOM.
 */
export class BaseCodeSnippet extends LitElement {
  static get _httpStyles() {
    return httpStyles;
  }

  get styles() {
    return BaseCodeSnippet._httpStyles;
  }

  render() {
    return html`<style>${this.styles}</style>
    <button class="copy-button" title="Copy to clipboard" @click="${this._copyToClipboard}">Copy</button>
    <code class="code language-snippet"></code>`;
  }

  static get properties() {
    return {
      /**
       * Request URL
       */
      url: { type: String },
      /**
       * HTTP method
       */
      method: { type: String },
      /**
       * Parsed HTTP headers.
       * Each item contains `name` and `value` properties.
       */
      headers: { type: Array },
      /**
       * HTTP body (the message)
       */
      payload: { type: String },
      /**
       * Enables Anypoint theme.
       */
      anypoint: { type: Boolean }
    };
  }

  get url() {
    return this._url;
  }

  get method() {
    return this._method;
  }

  get headers() {
    return this._headers;
  }

  get payload() {
    return this._payload;
  }

  set url(value) {
    const old = this._url;
    if (old === value) {
      return;
    }
    this._url = value;
    this.requestUpdate('url', old);
    this._valuesChanged();
  }

  set method(value) {
    const old = this._method;
    if (old === value) {
      return;
    }
    this._method = value;
    this.requestUpdate('method', old);
    this._valuesChanged();
  }

  set headers(value) {
    const old = this._headers;
    if (old === value) {
      return;
    }
    this._headers = value;
    this.requestUpdate('headers', old);
    this._valuesChanged();
  }

  set payload(value) {
    const old = this._payload;
    if (old === value) {
      return;
    }
    this._payload = value;
    this.requestUpdate('payload', old);
    this._valuesChanged();
  }

  get _code() {
    return this.shadowRoot.querySelector('code');
  }

  constructor() {
    super();
    this[highlighter] = new PrismHighlighter(this[highlightHandler].bind(this));
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this.__valuesDebouncer) {
      this._valuesChanged();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._clearValueTimeout();
  }

  /**
   * Resets the state of the render to initial state.
   */
  reset() {
    const node = this._code;
    if (node) {
      node.innerHTML = '';
    }
  }

  /**
   * Clears timeout from the debouncer if set.
   */
  _clearValueTimeout() {
    if (this.__valuesDebouncer) {
      clearTimeout(this.__valuesDebouncer);
      this.__valuesDebouncer = undefined;
    }
  }

  /**
   * Computes code value with debouncer.
   */
  _valuesChanged() {
    this._clearValueTimeout();
    this.__valuesDebouncer = setTimeout(() => {
      this.__valuesDebouncer = undefined;
      this._processCommand();
    });
  }

  /**
   * Processes the current snippet command.
   */
  _processCommand() {
    const { url, method, headers, payload } = this;
    const code = this._computeCommand(url, method, headers, payload);
    this.reset();
    if (!code) {
      return;
    }
    this[highlighter].debounce(code, this.lang);
  }

  /**
   * @abstract
   * @param {string} url
   * @param {string} method
   * @param {string} headers
   * @param {string=} payload
   * @returns {string}
   */
  _computeCommand(url, method, headers, payload) {
    return `${url} ${method} ${headers} ${payload}`;
  }

  /**
   * @param {string} code 
   */
  [highlightHandler](code) {
    const node = this._code;
    /* istanbul ignore else */
    if (node) {
      node.innerHTML += code;
    }
    this.dispatchEvent(new Event('highlighted'));
  }

  /**
   * Reads the host, port and path from the url.
   * This function uses URI library to parse the URL so you have to
   * include this library from bower_components if the element want to use it.
   *
   * @param {string} value
   * @return {UrlDetails}
   */
  urlDetails(value) {
    if (URI_CACHE[value]) {
      return URI_CACHE[value];
    }
    const url = value || this.url;
    const result = /** @type UrlDetails */ ({
      path: '',
      port: '',
      hostValue: '',
      autoPort: false,
    });
    if (!url) {
      return result;
    }
    let uri;
    try {
      uri = new URL(url);
    } catch (e) {
      if (url[0] === '/') {
        result.path = url;
        result.port = '80';
      }
      return result;
    }
    let host = uri.hostname;
    if (host) {
      host = decodeURIComponent(host);
    }
    let { port } = uri;
    if (!port) {
      result.autoPort = true;
      if (uri.protocol === 'https:') {
        port = '443';
      } else {
        port = '80';
      }
    }
    result.port = String(port);
    result.hostValue = host;
    const query = uri.search;
    let path = uri.pathname;
    if (!path) {
      path = '/';
    } else {
      path = decodeURIComponent(path);
    }
    if (query) {
      path += query;
    }
    result.path = path;
    URI_CACHE[url] = result;
    return result;
  }

  _copyToClipboard() {
    const code = this._code;
    if (!code) {
      return;
    }
    const content = code.innerText;
    if (this._beforeCopy(content)) {
      return;
    }
    const el = document.createElement('textarea');
    el.value = content;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    const selected = document.getSelection().rangeCount > 0 ?
      document.getSelection().getRangeAt(0) : false;
    el.select();
    try {
      document.execCommand('copy');
    } catch (err) {
      // ...
    }
    document.body.removeChild(el);
    document.getSelection().removeAllRanges();
    if (selected) {
      document.getSelection().addRange(selected);
    }
  }

  /**
   * Sends the `content-copy` event.
   * If the event is canceled then the logic from this element won't be
   * executed. Useful if current platform doesn't support `execCommand('copy')`
   * and has other way to manage clipboard.
   *
   * @param {string} value The value to dispatch with the event.
   * @return {boolean} True if handler executed copy function.
   */
  _beforeCopy(value) {
    const ev = new CustomEvent('content-copy', {
      detail: {
        value
      },
      bubbles: true,
      cancelable: true,
      composed: true
    });
    this.dispatchEvent(ev);
    return ev.defaultPrevented;
  }
}
