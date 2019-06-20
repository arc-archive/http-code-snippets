import { fixture, assert, aTimeout } from '@open-wc/testing';
import '../fetch-js-http-snippet.js';

describe('<fetch-js-http-snippet>', function() {
  async function basicFixture() {
    return (await fixture(`<fetch-js-http-snippet method="POST"
      url="http://domain.com" payload="test"></fetch-js-http-snippet>`));
  }

  async function noPayloadFixture() {
    return (await fixture(`<fetch-js-http-snippet method="GET" url="http://domain.com"></fetch-js-http-snippet>`));
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
    let compare = 'const headers = new Headers();\nheaders.append(\'Content-Type\', ';
    compare += '\'application/json\');\nheaders.append(\'Accept\', \'application/json\');';
    compare += '\n\nconst body = `test`;\n\nconst init = {\n  method: \'POST\',';
    compare += '\n  headers,\n  body\n}\n\nfetch(\'http://domain.com\', init)';
    compare += '\n.then((response) => {\n  return response.json(); // or .text()';
    compare += ' or .blob() ...\n})\n.then((text) => {\n  // text is the response body';
    compare += '\n})\n.catch((e) => {\n  // error in e.message\n});';
    await aTimeout();
    const code = element._code.innerText;
    assert.equal(code, compare);
  });

  it('No headers', async () => {
    const element = await basicFixture();
    await aTimeout();
    const code = element._code.innerText;
    assert.equal(code.indexOf('new Headers'), -1);
  });

  it('No payload', async () => {
    const element = await noPayloadFixture();
    await aTimeout();
    const code = element._code.innerText;
    assert.equal(code.indexOf('const body ='), -1);
  });
});
