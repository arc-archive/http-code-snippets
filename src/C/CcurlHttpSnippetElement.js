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
 * `c-curl-http-snippet`
 *
 * A snippet for requests made in C using curl library.
 */
export class CcurlHttpSnippetElement extends BaseCodeSnippet {
  get lang() {
    return 'clike';
  }

  get _codeHeaders() {
    return '#include <stdio.h>\n#include <curl/curl.h>\n\n';
  }

  /**
   * Computes code for C with curl.
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
    let result = this._codeHeaders;
    result += 'int main(void)\n{\n';
    result += '\tCURL *curl;\n\tCURLcode res;\n\n';
    result += '\tcurl = curl_easy_init();\n';
    result += `\tcurl_easy_setopt(curl, CURLOPT_URL, "${url}");\n`;
    result += `\tcurl_easy_setopt(curl, CURLOPT_CUSTOMREQUEST, "${method}");\n`;
    result += '\t/* if redirected, tell libcurl to follow redirection */\n';
    result += '\tcurl_easy_setopt(curl, CURLOPT_FOLLOWLOCATION, 1L);\n\n';
    if (Array.isArray(headers)) {
      result += '\tstruct curl_slist *headers = NULL;\n';
      headers.forEach((h) => {
        result += `\theaders = curl_slist_append(headers, "${h.name}: ${h.value}");\n`;
      });
      result += '\tcurl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);\n';
    }
    if (payload) {
      result += '\n';
      const re = /"/g;
      result += '\tchar *body ="';
      String(payload).split('\n').forEach((line) => {
        result += line.replace(re, '\\"');
      });
      result += '";\n';
      result += '\tcurl_easy_setopt(curl, CURLOPT_POSTFIELDS, body);\n';
    }
    result += '\n\t/* Perform the request, res will get the return code */\n';
    result += '\tres = curl_easy_perform(curl);\n';
    result += '\tif (res != CURLE_OK) {\n';
    result += '\t\tfprintf(stderr, "curl_easy_perform() failed: %s\\n"';
    result += ', curl_easy_strerror(res));\n';
    result += '\t}\n';
    result += '\t/* Clean up after yourself */\n';
    result += '\tcurl_easy_cleanup(curl);\n';
    result += '\treturn 0;\n';
    result += '}\n';
    result += '/* See: http://stackoverflow.com/a/2329792/1127848 of how ';
    result += 'to read data from the response. */';
    return result;
  }
}