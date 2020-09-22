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
import 'prismjs/components/prism-http.min.js';

/** @typedef {import('../BaseCodeSnippet').CodeHeader} CodeHeader */

/**
 * `raw-http-snippet`
 *
 * Code snippet to display raw HTTP message
 */
export class RawHttpSnippetElement extends BaseCodeSnippet {
  get lang() {
    return 'http';
  }

  /**
   * Computes bas command for cURL.
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
    const urlData = this.urlDetails(url);
    let result = `${method} ${urlData.path} HTTP/1.1\n`;
    if (urlData.hostValue) {
      result += `Host: ${urlData.hostValue}:${urlData.port}\n`;
    }
    result += this._genHeadersPart(headers);
    result += this._genPayloadPart(payload);
    return result;
  }

  /**
   * @param {CodeHeader[]} headers 
   * @returns {string}
   */
  _genHeadersPart(headers) {
    let result = '';
    if (headers && headers instanceof Array) {
      for (let i = 0, len = headers.length; i < len; i++) {
        const h = headers[i];
        result += `${h.name}: ${h.value}\n`;
      }
    }
    return result;
  }

  /**
   * @param {string} payload 
   * @returns {string}
   */
  _genPayloadPart(payload) {
    let result = '';
    if (payload) {
      result += '\n';
      result += payload;
      result += '\n\n';
    }
    return result;
  }
}
