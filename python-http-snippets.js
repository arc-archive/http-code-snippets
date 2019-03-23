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
import {PolymerElement} from '../../@polymer/polymer/polymer-element.js';
import {html} from '../../@polymer/polymer/lib/utils/html-tag.js';
import '../../@polymer/paper-tabs/paper-tabs.js';
import '../../@polymer/paper-tabs/paper-tab.js';
import '../../@polymer/iron-pages/iron-pages.js';
import './requests-python-http-snippet.js';
import './python-27-http-snippet.js';
import './python-31-http-snippet.js';
/**
 * `raw-http-snippet`
 *
 * A set of code snippets for Python requests.
 *
 * ## Styling
 *
 * Custom property | Description | Default
 * ----------------|-------------|----------
 * `--http-code-snippets` | Mixin applied to this elment | `{}`
 *
 * @customElement
 * @polymer
 * @demo demo/python.html Python demo
 * @memberof ApiElements
 */
class PythonHttpSnippets extends PolymerElement {
  static get template() {
    return html`<style>
    :host {
      display: block;
    }
    </style>
    <paper-tabs selected="{{selectedFramework}}">
      <paper-tab>Requests</paper-tab>
      <paper-tab>Python 2.7</paper-tab>
      <paper-tab>Python 3.1</paper-tab>
    </paper-tabs>
    <iron-pages selected="[[selectedFramework]]">
      <requests-python-http-snippet url="[[url]]" method="[[method]]"
        payload="[[payload]]" headers="[[headers]]"></requests-python-http-snippet>
      <python-27-http-snippet url="[[url]]" method="[[method]]"
        payload="[[payload]]" headers="[[headers]]"></python-27-http-snippet>
      <python-31-http-snippet url="[[url]]" method="[[method]]"
        payload="[[payload]]" headers="[[headers]]"></python-31-http-snippet>
    </iron-pages>`;
  }
  static get is() {
    return 'python-http-snippets';
  }

  static get properties() {
    return {
      selectedFramework: {
        type: Number,
        value: 0
      },
      /**
       * Request URL
       */
      url: String,
      /**
       * HTTP method
       */
      method: String,
      /**
       * Parsed HTTP headers.
       * Each item contains `name` and `value` properties.
       * @type {Array<Object>}
       */
      headers: Array,
      /**
       * HTTP body (the message)
       */
      payload: String
    };
  }
}
window.customElements.define(PythonHttpSnippets.is, PythonHttpSnippets);
