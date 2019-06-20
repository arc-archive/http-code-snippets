import { fixture, assert, aTimeout } from '@open-wc/testing';
import '../curl-http-snippet.js';

describe('<curl-http-snippet>', function() {
  async function basicFixture() {
    return (await fixture(`<curl-http-snippet method="POST"
      url="http://domain.com" payload="test"></curl-http-snippet>`));
  }

  async function noPayloadFixture() {
    return (await fixture(`<curl-http-snippet method="GET" url="http://domain.com"></curl-http-snippet>`));
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
    await aTimeout();
    const code = element._code.innerText;
    assert.equal(code, compare);
  });

  it('No headers', async () => {
    const element = await basicFixture();
    await aTimeout();
    const code = element._code.innerText;
    assert.equal(code.indexOf('-H'), -1);
  });

  it('No payload', async () => {
    const element = await noPayloadFixture();
    await aTimeout();
    const code = element._code.innerText;
    assert.equal(code.indexOf('-d'), -1);
  });
});
