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
import {BaseCodeSnippet} from './base-code-snippet.js';
import '../../@polymer/prism-element/prism-import.js';
import '../../prismjs/components/prism-python.min.js';
/**
 * `raw-http-snippet`
 *
 * A snippet for requests made in Python 3.1 using native library.
 *
 * ### Styling
 *
 * See `http-code-snippets` for styling documentation.
 *
 * @customElement
 * @polymer
 * @demo demo/python-31.html Python 3.1 demo
 * @memberof ApiElements
 * @extends BaseCodeSnippet
 */
class Python31HttpSnippet extends BaseCodeSnippet {
  static get is() {
    return 'python-31-http-snippet';
  }

  get lang() {
    return 'python';
  }

  /**
   * Computes code for Python (3.1).
   * @param {String} url
   * @param {String} method
   * @param {Array<Object>|undefined} headers
   * @param {String|undefined} payload
   * @return {String} Complete code for given arguments
   */
  _computeCommand(url, method, headers, payload) {
    if (!url || !method) {
      return '';
    }
    let result = 'import http.client\n\n';
    const hasHeaders = !!(headers && headers instanceof Array && headers.length);
    const hasPayload = !!payload;

    if (hasHeaders) {
      result += this._getHeaders(headers);
      if (!hasPayload) {
        result += '\n';
      }
    }
    if (hasPayload) {
      result += this._getPayload(payload);
    }
    result += this._getConnection(url, method, hasPayload, hasHeaders);
    result += this._getFooter();
    return result;
  }

  /**
   * @param {Array<Object>} headers List of headers
   * @return {String} Headers variable definition
   */
  _getHeaders(headers) {
    let result = 'headers = {';
    for (let i = 0, len = headers.length; i < len; i++) {
      const h = headers[i];
      result += `'${h.name}': '${h.value}'`;
      if (i + 1 !== len) {
        result += ',';
      }
    }
    result += '}\n';
    return result;
  }
  /**
   * @param {String} payload HTTP body
   * @return {String} Body variable definition
   */
  _getPayload(payload) {
    let result = 'body = """';
    result += payload;
    result += '"""\n\n';
    return result;
  }

  /**
   * Computes value of connection definition
   * @param {String} url HTTP request url
   * @param {String} method HTTP request method
   * @param {Boolean} hasPayload True if the request contains payload message
   * @param {Boolean} hasHeaders True if the request contains headers
   * @return {String}
   */
  _getConnection(url, method, hasPayload, hasHeaders) {
    const data = this.urlDetails(url);
    let clazz = 'HTTP';
    if (data.port === 443 || data.port === '443') {
      clazz += 'S';
    }
    let result = `conn = http.client.${clazz}Connection('${data.hostValue}')\n`;
    result += `conn.request('${method}','${data.path}'`;
    if (hasPayload) {
      result += ', body';
    }
    if (hasHeaders) {
      result += ', headers';
    }
    result += ')\n';
    return result;
  }
  /**
   * @return {String} Returns ending of the code definition
   */
  _getFooter() {
    let result = 'res = conn.getresponse()\n';
    result += '\n';
    result += 'data = res.read()\n';
    result += 'print(res.status, res.reason)\n';
    result += 'print(data.decode(\'utf-8\'))\n';
    result += 'print(res.getheaders())';
    return result;
  }
}
window.customElements.define(Python31HttpSnippet.is, Python31HttpSnippet);
