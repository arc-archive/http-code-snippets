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
import { LitElement, html, css } from 'lit-element';
import '@anypoint-web-components/awc/anypoint-tabs.js';
import '@anypoint-web-components/awc/anypoint-tab.js';
import '../../requests-python-http-snippet.js';
import '../../python-27-http-snippet.js';
import '../../python-31-http-snippet.js';

/** @typedef {import('lit-element').TemplateResult} TemplateResult */
/** @typedef {import('@anypoint-web-components/awc').AnypointTabsElement} AnypointTabsElement */
/** @typedef {import('../BaseCodeSnippet').CodeHeader} CodeHeader */

/**
 * `python-http-snippets`
 *
 * A set of code snippets for Python requests.
 */
export class PythonHttpSnippetsElement extends LitElement {
  get styles() {
    return css`
    :host {
      display: block;
    }`;
  }

  static get properties() {
    return {
      /**
       * Currently selected snippet
       * @attribute
       */
      selected: { type: Number },
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
       */
      headers: { type: Array },
      /**
       * HTTP body (the message)
       * @attribute
       */
      payload: { type: String },
      /**
       * Enables Anypoint theme.
       * @attribute
       */
      anypoint: { type: Boolean }
    };
  }

  constructor() {
    super();
    this.selected = 0;
    this.anypoint = false;
    this.url = undefined;
    this.method = undefined; 
    this.payload = undefined;
    /**
     * @type {CodeHeader[]}
     */
    this.headers = undefined;
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
   * @param {number} selected 
   * @returns {TemplateResult|string} Template for the current snippet
   */
  _renderPage(selected) {
    const { url, method, payload, headers } = this;
    switch (selected) {
      case 0: return html`<requests-python-http-snippet
        .url="${url}"
        .method="${method}"
        .payload="${payload}"
        .headers="${headers}"></requests-python-http-snippet>`;
      case 1: return html`<python-27-http-snippet
        .url="${url}"
        .method="${method}"
        .payload="${payload}"
        .headers="${headers}"></python-27-http-snippet>`;
      case 2: return html`<python-31-http-snippet
        .url="${url}"
        .method="${method}"
        .payload="${payload}"
        .headers="${headers}"></python-31-http-snippet>`;
      default: return '';
    }
  }

  /**
   * @returns {TemplateResult}
   */
  render() {
    const { selected, anypoint } = this;
    return html`<style>${this.styles}</style>
    <anypoint-tabs
      ?anypoint="${anypoint}"
      .selected="${selected}"
      @selectedchange="${this._selectedCHanged}">
      <anypoint-tab>Requests</anypoint-tab>
      <anypoint-tab>Python 2.7</anypoint-tab>
      <anypoint-tab>Python 3.1</anypoint-tab>
    </anypoint-tabs>
    ${this._renderPage(selected)}
    `;
  }
}
