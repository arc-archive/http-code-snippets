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
import '@anypoint-web-components/anypoint-tabs/anypoint-tabs.js';
import '@anypoint-web-components/anypoint-tabs/anypoint-tab.js';
import '../../java-platform-http-snippet.js';
import '../../java-spring-http-snippet.js';


/** @typedef {import('../BaseCodeSnippet').CodeHeader} CodeHeader */
/** @typedef {import('lit-element').TemplateResult} TemplateResult */

/**
 * `javascript-http-snippet`
 *
 * A set of code snippets for Java requests.=
 */
export class JavaHttpSnippetsElement extends LitElement {
  get styles() {
    return css`:host {
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
       * Enables compatibility with Anypoint components.
       * @attribute
       */
      compatibility: { type: Boolean, reflect: true }
    };
  }

  constructor() {
    super();
    this.selected = 0;
    this.compatibility = false;
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
    const { value } = e.detail;
    this.selected = value;
  }

  /**
   * @param {number} selected 
   * @returns {TemplateResult|string} Template for the current snippet
   */
  _renderPage(selected) {
    const { url, method, payload, headers } = this;
    switch (selected) {
      case 0: return html`<java-platform-http-snippet
        .url="${url}"
        .method="${method}"
        .payload="${payload}"
        .headers="${headers}"></java-platform-http-snippet>`;
      case 1: return html`<java-spring-http-snippet
        .url="${url}"
        .method="${method}"
        .payload="${payload}"
        .headers="${headers}"></java-spring-http-snippet>`;
      default: return '';
    }
  }

  /**
   * @returns {TemplateResult}
   */
  render() {
    const { selected, compatibility } = this;
    return html`<style>${this.styles}</style>
    <anypoint-tabs
      ?compatibility="${compatibility}"
      .selected="${selected}"
      @selected-changed="${this._selectedCHanged}">
      <anypoint-tab>Platform</anypoint-tab>
      <anypoint-tab>Spring</anypoint-tab>
    </anypoint-tabs>
    ${this._renderPage(selected)}`;
  }
}