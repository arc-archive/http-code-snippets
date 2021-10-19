import { fixture, assert, html, oneEvent } from '@open-wc/testing';
import '../curl-http-snippet.js';

/** @typedef {import('../src/Bash/CurlHttpSnippetElement').CurlHttpSnippetElement} CurlHttpSnippetElement */

describe('<curl-http-snippet>', () => {
  /**
   * @returns {Promise<CurlHttpSnippetElement>}
   */
  async function basicFixture() {
    return (fixture(html`<curl-http-snippet method="POST"
      url="http://domain.com" payload="test"></curl-http-snippet>`));
  }

  /**
   * @returns {Promise<CurlHttpSnippetElement>}
   */
  async function noPayloadFixture() {
    return (fixture(html`<curl-http-snippet method="GET" url="http://domain.com"></curl-http-snippet>`));
  }

  it('Renders code block (full)', async () => {
    const element = await basicFixture();
    element.headers = [{
      name: 'Content-Type',
      value: 'application/json'
    }, {
      name: 'Accept',
      value: 'application/json'
    }];
    let compare = 'curl "http://domain.com" \\\n  -X POST \\\n  -d "test" ';
    compare += '\\\n  -H "Content-Type: application/json" \\\n  -H "Accept: application/json" ';
    await oneEvent(element, 'highlighted');
    const code = element._code.innerText;
    assert.equal(code, compare);
  });

  it('No headers', async () => {
    const element = await basicFixture();
    await oneEvent(element, 'highlighted');
    const code = element._code.innerText;
    assert.equal(code.indexOf('-H'), -1);
  });

  it('No payload', async () => {
    const element = await noPayloadFixture();
    await oneEvent(element, 'highlighted');
    const code = element._code.innerText;
    assert.equal(code.indexOf('-d'), -1);
  });
});
