import { fixture, assert, aTimeout } from '@open-wc/testing';
import '../xhr-http-snippet.js';

/** @typedef {import('../src/JavaScript/XhrHttpSnippetElement').XhrHttpSnippetElement} XhrHttpSnippetElement */

describe('<xhr-http-snippet>', () => {
  /**
   * @return {Promise<XhrHttpSnippetElement>}
   */
  async function basicFixture() {
    return (fixture(`<xhr-http-snippet method="POST"
      url="http://domain.com" payload="test\nmultiple"></xhr-http-snippet>`));
  }

  /**
   * @return {Promise<XhrHttpSnippetElement>}
   */
  async function noPayloadFixture() {
    return (fixture(`<xhr-http-snippet method="GET"
      url="http://domain.com"></xhr-http-snippet>`));
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

    const lines = [
      'var xhr = new XMLHttpRequest();',
      'xhr.addEventListener(\'load\', function(e) {',
      '  var response = e.target.responseText;',
      '  console.log(response);',
      '});',
      'xhr.addEventListener(\'error\', function(e) {',
      '  console.error(\'Request error with status\', e.target.status);',
      '});',
      'xhr.open(\'POST\', \'http://domain.com\');',
      'xhr.setRequestHeader(\'Content-Type\',\'application/json\');',
      'xhr.setRequestHeader(\'Accept\',\'application/json\');',
      'var body = \'\';',
      'body += \'test\\n\';',
      'body += \'multiple\';',
      'xhr.send(body);',
      ''
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
    assert.equal(code.indexOf('setRequestHeader'), -1);
  });

  it('No payload', async () => {
    const element = await noPayloadFixture();
    await aTimeout(0);
    const code = element._code.innerText;
    assert.equal(code.indexOf('xhr.send(body);'), -1);
  });
});
