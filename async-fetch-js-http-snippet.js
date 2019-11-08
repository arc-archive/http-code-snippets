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
import { BaseCodeSnippet } from './base-code-snippet.js';
/**
 * `fetch-js-http-snippet`
 *
 * A snippet for requests made in JavaScript using Fetch API.
 *
 * ### Styling
 *
 * See `http-code-snippets` for styling documentation.
 *
 * @customElement
 * @demo demo/fetch-js.html Fetch (JavaScript) demo
 * @memberof ApiElements
 * @extends BaseCodeSnippet
 */
class AsyncFetchJsHttpSnippet extends BaseCodeSnippet {
  get lang() {
    return 'javascript';
  }

  /**
   * Computes code for JavaScript (Fetch API).
   * @param {String} url
   * @param {String} method
   * @param {Array<Object>|undefined} headers
   * @param {String} payload
   * @return {String} Complete code for given arguments
   */
  _computeCommand(url, method, headers, payload) {
    if (!url || !method) {
      return '';
    }
    const hasHeaders = !!(headers && headers instanceof Array && headers.length);
    const hasPayload = !!payload;
    const hasInit = hasHeaders || hasPayload || !!(method && method !== 'GET');
    let result = '(async () => {\n';

    if (hasInit) {
      if (hasHeaders) {
        result += this._createHeaders(headers);
      }
      if (hasPayload) {
        result += this._createPayload(payload);
      }
      result += '  const init = {\n';
      result += `    method: '${method}'`;
      if (hasHeaders) {
        result += `,\n    headers`;
      }
      if (hasPayload) {
        result += `,\n    body`;
      }
      result += '\n';
      result += '  };\n\n';
    }

    result += `  const response = await fetch('${url}'`;
    if (hasInit) {
      result += ', init';
    }
    result += ');\n';
    result += '  console.log(`response status is ${response.status}`);\n';
    result += '  const mediaType = response.headers.get(\'content-type\');\n';
    result += '  let data;\n';
    result += '  if (mediaType.includes(\'json\')) {\n';
    result += '    data = await response.json();\n';
    result += '  } else {\n';
    result += '    data = await response.text();\n';
    result += '  }\n';
    result += '  console.log(data);\n';
    result += '})();';
    return result;
  }

  _createHeaders(headers) {
    let result = '  const headers = new Headers();\n';
    for (let i = 0, len = headers.length; i < len; i++) {
      const h = headers[i];
      result += `  headers.append('${h.name}', '${h.value}');\n`;
    }
    result += '\n';
    return result;
  }

  _createPayload(payload) {
    // return `  const body = \`${payload}\`;\n\n`;
    let result = '  const body = `';
    const list = payload.split('\n');
    const size = list.length;
    list.forEach((line, i) => {
      const nl = i + 1 === size ? '' : '\n'
      const spaces = i === 0 ? '' : '  ';
      result += `${spaces}${line}${nl}`;
    });
    result += '`;\n\n';
    return result;
  }
}
window.customElements.define('async-fetch-js-http-snippet', AsyncFetchJsHttpSnippet);
