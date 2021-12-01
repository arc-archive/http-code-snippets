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
 * `python-27-http-snippet`
 *
 * A snippet for requests made in Python 2.7 using native library.
 */
export class Python27HttpSnippetElement extends BaseCodeSnippet {
  get lang() {
    return 'python';
  }

  /**
   * Computes code for Python (2.7).
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
    let result = 'import httplib\n\n';
    const hasHeaders = !!(Array.isArray(headers) && headers.length);
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
   * @param {string} url HTTP request url
   * @param {string} method HTTP request method
   * @param {boolean} hasPayload True if the request contains payload message
   * @param {boolean} hasHeaders True if the request contains headers
   * @return {string}
   */
  _getConnection(url, method, hasPayload, hasHeaders) {
    const data = this.urlDetails(url);
    let clazz = 'HTTP';
    if (data.port === '443') {
      clazz += 'S';
    }
    let result = `conn = httplib.${clazz}Connection('${data.hostValue}'`;
    if (data.port && !['80', '443'].includes(data.port)) {
      result += `, ${data.port}`;
    }
    result += ')\n';
    result += `conn.request('${method}', '${data.path}'`;
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
   * @return {string} Returns ending of the code definition
   */
  _getFooter() {
    let result = 'res = conn.getresponse()\n';
    result += '\n';
    result += 'print(res.status, res.reason)\n';
    result += 'print(res.read())\n';
    result += 'print(res.getheaders())';
    return result;
  }
}
