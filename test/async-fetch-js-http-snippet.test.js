/* eslint-disable no-template-curly-in-string */
import { fixture, assert, aTimeout, html } from '@open-wc/testing';
import '../async-fetch-js-http-snippet.js';

/** @typedef {import('../src/JavaScript/AsyncFetchJsHttpSnippetElement').AsyncFetchJsHttpSnippetElement} AsyncFetchJsHttpSnippetElement */
/** @typedef {import('../src/BaseCodeSnippet').CodeHeader} CodeHeader */

describe('<async-fetch-js-http-snippet>', () => {
  /**
   * @param {CodeHeader[]=} headers
   * @returns {Promise<AsyncFetchJsHttpSnippetElement>}
   */
  async function basicFixture(headers) {
    return (fixture(html`<async-fetch-js-http-snippet
      method="POST"
      url="http://domain.com"
      payload="test\nmultiline"
      .headers="${headers}"
    ></async-fetch-js-http-snippet>`));
  }

  /**
   * @returns {Promise<AsyncFetchJsHttpSnippetElement>}
   */
  async function noPayloadFixture() {
    return (fixture(html`<async-fetch-js-http-snippet
      method="GET"
      url="http://domain.com"
    ></async-fetch-js-http-snippet>`));
  }

  it('Renders code block (full)', async () => {
    const element = await basicFixture([{
      name: 'Content-Type',
      value: 'application/json'
    }, {
      name: 'Accept',
      value: 'application/json'
    }]);

    const lines = [
      '(async () => {',
      '  const headers = new Headers();',
      '  headers.append(\'Content-Type\', \'application/json\');',
      '  headers.append(\'Accept\', \'application/json\');',
      '',
      '  const body = `test',
      '  multiline`;',
      '',
      '  const init = {',
      '    method: \'POST\',',
      '    headers,',
      '    body',
      '  };',
      '',
      '  const response = await fetch(\'http://domain.com\', init);',
      '  console.log(`response status is ${response.status}`);',
      '  const mediaType = response.headers.get(\'content-type\');',
      '  let data;',
      '  if (mediaType.includes(\'json\')) {',
      '    data = await response.json();',
      '  } else {',
      '    data = await response.text();',
      '  }',
      '  console.log(data);',
      '})();',
    ];

    await aTimeout(0);
    const code = element._code.innerText;
    const result = code.split('\n');
    for (let i = 0; i < result.length; i++) {
      assert.equal(result[i], lines[i], `Line ${i} matches`);
    }
  });

  it('No headers', async () => {
    const element = await basicFixture();
    await aTimeout(0);
    const code = element._code.innerText;
    assert.equal(code.indexOf('new Headers'), -1);
  });

  it('No payload', async () => {
    const element = await noPayloadFixture();
    await aTimeout(0);
    const code = element._code.innerText;
    assert.equal(code.indexOf('const body ='), -1);
  });
});
