import { fixture, assert, html, oneEvent } from '@open-wc/testing';
import '../c-curl-http-snippet.js';

/** @typedef {import('../src/C/CcurlHttpSnippetElement').CcurlHttpSnippetElement} CcurlHttpSnippetElement */

describe('<c-curl-http-snippet>', () => {
  /**
   * @returns {Promise<CcurlHttpSnippetElement>}
   */
  async function basicFixture() {
    return (fixture(html`<c-curl-http-snippet method="POST"
      url="http://domain.com" payload="test"></c-curl-http-snippet>`));
  }

  /**
   * @returns {Promise<CcurlHttpSnippetElement>}
   */
  async function noPayloadFixture() {
    return (fixture(html`<c-curl-http-snippet method="GET" url="http://domain.com"></c-curl-http-snippet>`));
  }

  it('Renders code block (full)', async () => {
    const element = await basicFixture();
    element.headers = [{
      name: 'Content-Type',
      value: 'application/json'
    }];
    await oneEvent(element, 'highlighted');
    let compare = '#include <stdio.h>\n#include <curl/curl.h>\n\nint main(void)\n{\n\tCURL *curl;';
    compare += '\n\tCURLcode res;\n\n\tcurl = curl_easy_init();';
    compare += '\n\tcurl_easy_setopt(curl, CURLOPT_URL, "http://domain.com");';
    compare += '\n\tcurl_easy_setopt(curl, CURLOPT_CUSTOMREQUEST, "POST");';
    compare += '\n\t/* if redirected, tell libcurl to follow redirection */';
    compare += '\n\tcurl_easy_setopt(curl, CURLOPT_FOLLOWLOCATION, 1L);';
    compare += '\n\n\tstruct curl_slist *headers = NULL;';
    compare += '\n\theaders = curl_slist_append(headers, "Content-Type: application/json");';
    compare += '\n\tcurl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);\n\n\tchar *body ="test";';
    compare += '\n\tcurl_easy_setopt(curl, CURLOPT_POSTFIELDS, body);';
    compare += '\n\n\t/* Perform the request, res will get the return code */';
    compare += '\n\tres = curl_easy_perform(curl);\n\tif (res != CURLE_OK) {';
    compare += '\n\t\tfprintf(stderr, "curl_easy_perform() failed: %s';
    compare += '\\n", curl_easy_strerror(res));\n\t}\n\t/* Clean up after yourself */';
    compare += '\n\tcurl_easy_cleanup(curl);\n\treturn 0;\n}';
    compare += '\n/* See: http://stackoverflow.com/a/2329792/1127848 ';
    compare += 'of how to read data from the response. */';
    const code = element._code.innerText;
    assert.equal(code, compare);
  });

  it('No headers', async () => {
    const element = await basicFixture();
    await oneEvent(element, 'highlighted');
    const code = element._code.innerText;
    assert.equal(code.indexOf('CURLOPT_HTTPHEADER'), -1);
  });

  it('No payload', async () => {
    const element = await noPayloadFixture();
    await oneEvent(element, 'highlighted');
    const code = element._code.innerText;
    assert.equal(code.indexOf('CURLOPT_POSTFIELDS'), -1);
  });
});
