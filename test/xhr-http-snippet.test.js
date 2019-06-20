import { fixture, assert, aTimeout } from '@open-wc/testing';
import '../xhr-http-snippet.js';

describe('<xhr-http-snippet>', function() {
  async function basicFixture() {
    return (await fixture(`<xhr-http-snippet method="POST"
      url="http://domain.com" payload="test"></xhr-http-snippet>`));
  }

  async function noPayloadFixture() {
    return (await fixture(`<xhr-http-snippet method="GET"
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
      '  console.error(\'Request errored with status\', e.target.status);',
      '});',
      'xhr.open(\'POST\', \'http://domain.com\');',
      'xhr.setRequestHeader(\'Content-Type\',\'application/json\');',
      'xhr.setRequestHeader(\'Accept\',\'application/json\');',
      'var body = \'\';',
      'body += \'test\\n\';',
      'xhr.send(body);',
      ''
    ];
    await aTimeout();
    const code = element._code.innerText;
    const result = code.split('\n');
    for (let i = 0; i < result.length; i++) {
      assert.equal(result[i], lines[i], `Line ${i} matches`);
    }
  });

  it('No headers', async () => {
    const element = await basicFixture();
    await aTimeout();
    const code = element._code.innerText;
    assert.equal(code.indexOf('setRequestHeader'), -1);
  });

  it('No payload', async () => {
    const element = await noPayloadFixture();
    await aTimeout();
    const code = element._code.innerText;
    assert.equal(code.indexOf('xhr.send(body);'), -1);
  });
});