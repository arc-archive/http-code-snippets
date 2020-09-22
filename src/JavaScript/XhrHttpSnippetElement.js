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

/** @typedef {import('../BaseCodeSnippet').CodeHeader} CodeHeader */

/**
 * `xhr-http-snippet`
 *
 * A snippet for requests made in JavaScript using XHR object.
 */
export class XhrHttpSnippetElement extends BaseCodeSnippet {
  get lang() {
    return 'javascript';
  }

  /**
   * Computes code for JavaScript (XHR API).
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
    const hasHeaders = !!(headers && headers instanceof Array && headers.length);
    const hasPayload = !!payload;
    let result = 'var xhr = new XMLHttpRequest();\n';
    result += 'xhr.addEventListener(\'load\', function(e) {\n';
    result += '  var response = e.target.responseText;\n';
    result += '  console.log(response);\n';
    result += '});\n';
    result += 'xhr.addEventListener(\'error\', function(e) {\n';
    result += '  console.error(\'Request error with status\', e.target.status);\n';
    result += '});\n';
    result += `xhr.open('${method}', '${url}');\n`;
    if (hasHeaders) {
      headers.forEach((h) => {
        result += `xhr.setRequestHeader('${h.name}','${h.value}');\n`;
      });
    }
    if (hasPayload) {
      result += 'var body = \'\';\n';
      const re = /'/g;
      const list = payload.split('\n');
      const size = list.length;
      list.forEach((line, i) => {
        const nl = i + 1 === size ? '' : '\\n'
        // eslint-disable-next-line no-param-reassign
        line = line.replace(re, '\\\'');
        result += `body += '${line}${nl}';\n`;
      });
      result += 'xhr.send(body);\n';
    } else {
      result += 'xhr.send();\n';
    }
    return result;
  }
}
