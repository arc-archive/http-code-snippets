
import { LitElement, html, css } from 'lit-element';
import '@anypoint-web-components/awc/anypoint-tabs.js';
import '@anypoint-web-components/awc/anypoint-tab.js';
import '../raw-http-snippet.js';
import '../curl-http-snippet.js';
import '../javascript-http-snippets.js';
import '../python-http-snippets.js';
import '../c-curl-http-snippet.js';
import '../java-http-snippets.js';

/** @typedef {import('./BaseCodeSnippet').CodeHeader} CodeHeader */
/** @typedef {import('@anypoint-web-components/awc').AnypointTabsElement} AnypointTabsElement */

/**
 * `http-code-snippets`
 *
 * Code snippets to display code implementation examples for a HTTP request
 */
export class HttpCodeSnippetsElement extends LitElement {
  get styles() {
    return css`
    :host {
      display: block;
    }`;
  }

  static get properties() {
    return {
      /**
       * Currently selected tab for the platform row.
       * @attribute
       */
      selected: { type: Number },
      /**
       * Computed list of headers from `headers` property.
       * It is an array of objects where each object contains `name` and `value`
       * properties.
       */
      _headersList: { type: Array },
      // Passed to `anypoint-tabs` `scrollable` property
      scrollable: { type: Boolean },
      /**
       * Request URL
       * @attribute
       */
      url: { type: String },
      /**
       * HTTP method
       * @attribute
       */
      method: { type: String },
      /**
       * Parsed HTTP headers.
       * Each item contains `name` and `value` properties.
       * @attribute
       */
      headers: { type: String },
      /**
       * HTTP body (the message)
       * @attribute
       */
      payload: { type: String },
      /**
       * Enables Anypoint theme.
       * @attribute
       */
      anypoint: { type: Boolean, reflect: true }
    };
  }

  get headers() {
    return this._headers;
  }

  set headers(value) {
    const old = this._headers;
    if (old === value) {
      return;
    }
    this._headers = value;
    this._headersList = this.headersToList(value);
  }

  constructor() {
    super();
    this.selected = 0;
    this.scrollable = false;
    this.anypoint = false;
    this.url = undefined;
    this.method = undefined; 
    this.payload = undefined;
  }

  /**
   * Handler for `selected-changed` event dispatched on anypoint-tabs.
   * @param {CustomEvent} e
   */
  _selectedCHanged(e) {
    const node = /** @type AnypointTabsElement */ (e.target);
    this.selected = /** @type number */ (node.selected);
  }

  /**
   * Computes a list of headers from a headers string.
   * @param {string=} headersValue The headers to process
   * @return {CodeHeader[]} Headers as a list od maps. Can be empty.
   */
  headersToList(headersValue) {
    let headers = headersValue || this.headers;
    if (typeof headers !== 'string' || !headers || !headers.trim()) {
      return [];
    }
    const result = [];
    headers = headers.replace('\\n', '\n');
    headers = headers.split(/\n(?=[^ \t]+)/gim);
    for (let i = 0, len = headers.length; i < len; i++) {
      const line = headers[i].trim();
      if (line === '') {
        continue;
      }
      const sepPosition = line.indexOf(':');
      if (sepPosition === -1) {
        result[result.length] = {
          name: line,
          value: ''
        };
        continue;
      }
      const name = line.substr(0, sepPosition);
      const value = line.substr(sepPosition + 1).trim();
      const obj = {
        name,
        value,
      };
      result.push(obj);
    }
    return result;
  }

  render() {
    const { selected, scrollable, anypoint } = this;
    return html`
    <style>${this.styles}</style>
    <anypoint-tabs
      .selected="${selected}"
      ?scrollable="${scrollable}"
      fitcontainer
      ?anypoint="${anypoint}"
      @selectedchange="${this._selectedCHanged}"
    >
      <anypoint-tab>cURL</anypoint-tab>
      <anypoint-tab>HTTP</anypoint-tab>
      <anypoint-tab>JavaScript</anypoint-tab>
      <anypoint-tab>Python</anypoint-tab>
      <anypoint-tab>C</anypoint-tab>
      <anypoint-tab>Java</anypoint-tab>
    </anypoint-tabs>
    ${this._snippetTemplate()}`;
  }

  _snippetTemplate() {
    const { selected, url, method, payload, _headersList: headers, anypoint } = this;
    switch (selected) {
      case 0: return html`<curl-http-snippet
        .url="${url}"
        .method="${method}"
        .payload="${payload}"
        .headers="${headers}"></curl-http-snippet>`;
      case 1: return html`<raw-http-snippet
        .url="${url}"
        .method="${method}"
        .payload="${payload}"
        .headers="${headers}"></raw-http-snippet>`;
      case 2: return html`<javascript-http-snippets
        .url="${url}"
        .method="${method}"
        .payload="${payload}"
        .headers="${headers}"
        ?anypoint="${anypoint}"></javascript-http-snippets>`;
      case 3: return html`<python-http-snippets
        .url="${url}"
        .method="${method}"
        .payload="${payload}"
        .headers="${headers}"
        ?anypoint="${anypoint}"></python-http-snippets>`;
      case 4: return html`<c-curl-http-snippet
        .url="${url}"
        .method="${method}"
        .payload="${payload}"
        .headers="${headers}"></c-curl-http-snippet>`;
      case 5: return html`<java-http-snippets
        .url="${url}"
        .method="${method}"
        .payload="${payload}"
        .headers="${headers}"
        ?anypoint="${anypoint}"></java-http-snippets>`;
      default: return '';
    }
  }
}
