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
import 'prismjs/components/prism-bash.min.js';

/** @typedef {import('../BaseCodeSnippet').CodeHeader} CodeHeader */

/**
 * `curl-http-snippet`
 *
 * A snippet for curl command in bash.
 */
export class CurlHttpSnippetElement extends BaseCodeSnippet {
  get lang() {
    return 'bash';
  }

  /**
   * Computes command for cURL.
   * @param {string} urlValue
   * @param {string} methodValue
   * @param {CodeHeader[]} headers
   * @param {string} payload
   * @return {string} Complete code for given arguments
   */
  _computeCommand(urlValue, methodValue, headers, payload) {
    const url = urlValue || '';
    const method = methodValue || 'GET';
    let result = `curl "${url}" \\\n`;
    if (method !== 'GET') {
      result += `  -X ${method} \\\n`;
    }
    if (payload) {
      let quot = '';
      try {
        // eslint-disable-next-line no-param-reassign
        payload = JSON.stringify(payload);
      } catch (_) {
        quot = '"';
      }
      result += `  -d ${quot}${payload}${quot} \\\n`;
    }
    if (headers && headers instanceof Array) {
      for (let i = 0, len = headers.length; i < len; i++) {
        const h = headers[i];
        result += `  -H "${h.name}: ${h.value}" `;
        if (i + 1 !== len) {
          result += '\\\n';
        }
      }
    }
    if (result.substr(-2) === '\\\n') {
      result = result.substr(0, result.length - 3);
    }
    return result;
  }
}