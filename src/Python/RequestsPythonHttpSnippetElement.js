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
import { BaseCodeSnippet } from '../BaseCodeSnippet.js';
import 'prismjs/prism.js';
import 'prismjs/components/prism-python.min.js';

/** @typedef {import('../BaseCodeSnippet').CodeHeader} CodeHeader */

/**
 * `requests-python-http-snippet`
 *
 * A snippet for requests made in Python using the Requests library.
 */
export class RequestsPythonHttpSnippetElement extends BaseCodeSnippet {
  get lang() {
    return 'python';
  }

  /**
   * Computes code for Python (Request lib).
   * @param {string} url
   * @param {string} method
   * @param {CodeHeader[]} headers
   * @param {string} payload
   * @return {string} Complete code for given arguments
   */
  _computeCommand(url, method, headers, payload) {
    if (!url || !method) {
      return '';
    }
    let result = 'import requests\n\n';
    const hasHeaders = !!(headers && headers instanceof Array && headers.length);
    const hasPayload = !!payload;
    result += `url = '${url}'\n`;
    if (hasHeaders) {
      result += this._getHeaders(headers);
      if (!hasPayload) {
        result += '\n';
      }
    }
    if (hasPayload) {
      result += this._getPayload(payload);
    }
    result += this._getConnection(method, hasPayload, hasHeaders);
    result += this._getFooter();
    return result;
  }

  /**
   * @param {CodeHeader[]} headers List of headers
   * @return {string} Headers variable definition
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
   * @param {string} payload HTTP body
   * @return {string} Body variable definition
   */
  _getPayload(payload) {
    let result = 'body = """';
    result += payload;
    result += '"""\n\n';
    return result;
  }

  /**
   * Computes value of connection definition
   * @param {string} method HTTP request method
   * @param {boolean} hasPayload True if the request contains payload message
   * @param {boolean} hasHeaders True if the request contains headers
   * @return {string}
   */
  _getConnection(method, hasPayload, hasHeaders) {
    const lowerMethod = String(method).toLowerCase();
    let result = `req = requests.${lowerMethod}(url`;
    if (hasHeaders) {
      result += ', headers=headers';
    }
    if (hasPayload) {
      result += ', data=body';
    }
    result += ')\n\n';
    return result;
  }

  /**
   * @return {string} Returns ending of the code definition
   */
  _getFooter() {
    let result = 'print(req.status_code)\n';
    result += 'print(req.headers)\n';
    result += 'print(req.text)';
    return result;
  }
}