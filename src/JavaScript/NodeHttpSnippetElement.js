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
 * `node-http-snippet`
 *
 * A set of code snippets for Node requests.
 */
export class NodeHttpSnippetElement extends BaseCodeSnippet {
  get lang() {
    return 'javascript';
  }

  /**
   * Computes code for JavaScript (Node).
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
    const isHttps = String(url).indexOf('https:') === 0;
    let libName = 'http';
    if (isHttps) {
      libName += 's';
    }
    let result = `const http = require('${libName}');\n`;
    const data = this.urlDetails(url);
    result += 'const init = {\n';
    result += `  host: '${data.hostValue}',\n`;
    result += `  path: '${data.path}',\n`;
    if (!data.autoPort) {
      result += `  port: ${data.port},\n`;
    }
    result += `  method: '${method}',\n`;
    result += this._genHeadersPart(headers);
    result += '};\n';
    result += 'const callback = function(response) {\n';
    result += '  let result = Buffer.alloc(0);\n';
    result += '  response.on(\'data\', function(chunk) {\n';
    result += '    result = Buffer.concat([result, chunk]);\n';
    result += '  });\n';
    result += '  \n';
    result += '  response.on(\'end\', function() {\n';
    result += '    // result has response body buffer\n';
    result += '    console.log(result.toString());\n';
    result += '  });\n';
    result += '};\n';
    result += '\n';
    result += 'const req = http.request(init, callback);\n';
    result += this._genPayloadPart(payload);
    result += 'req.end();\n';
    return result;
  }

  /**
   * 
   * @param {CodeHeader[]} headers 
   * @returns {string}
   */
  _genHeadersPart(headers) {
    let result = '';
    if (headers && headers instanceof Array && headers.length) {
      result += '  headers: {\n';
      for (let i = 0, len = headers.length; i < len; i++) {
        const h = headers[i];
        result += `    '${h.name}': '${h.value}'`;
        if (i + 1 !== len) {
          result += ',';
        }
        result += '\n';
      }
      result += '  }\n';
    }
    return result;
  }

  /**
   * 
   * @param {string} payload 
   * @returns {string}
   */
  _genPayloadPart(payload) {
    let result = '';
    if (payload) {
      result += `const body = \`${payload}\`;\n`;
      result += 'req.write(body);\n';
    }
    return result;
  }
}
