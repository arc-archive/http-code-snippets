import { fixture, assert, html, oneEvent } from '@open-wc/testing';
import '../requests-python-http-snippet.js';

/** @typedef {import('../src/Python/RequestsPythonHttpSnippetElement').RequestsPythonHttpSnippetElement} RequestsPythonHttpSnippetElement */

describe('<requests-python-http-snippet>', () => {
  /**
   * @returns {Promise<RequestsPythonHttpSnippetElement>}
   */
  async function basicFixture() {
    return (fixture(html`<requests-python-http-snippet method="POST"
      url="http://domain.com" payload="test"></requests-python-http-snippet>`));
  }
  /**
   * @returns {Promise<RequestsPythonHttpSnippetElement>}
   */
  async function noPayloadFixture() {
    return (fixture(html`<requests-python-http-snippet method="GET"
      url="http://domain.com"></requests-python-http-snippet>`));
  }

  describe('requests-python-http-snippet', () => {
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
        'import requests',
        '',
        'url = \'http://domain.com\'',
        'headers = {\'Content-Type\': \'application/json\',\'Accept\': \'application/json\'}',
        'body = """test"""',
        '',
        'req = requests.post(url, headers=headers, data=body)',
        '',
        'print(req.status_code)',
        'print(req.headers)',
        'print(req.text)'
      ];
      await oneEvent(element, 'highlighted');
      const code = element._code.innerText;
      const result = code.split('\n');
      for (let i = 0; i < result.length; i++) {
        assert.equal(result[i], lines[i], `Line ${i} matches`);
      }
    });

    it('No headers', async () => {
      const element = await basicFixture();
      await oneEvent(element, 'highlighted');
      const code = element._code.innerText;
      assert.equal(code.indexOf('headers = {'), -1);
    });

    it('No payload', async () => {
      const element = await noPayloadFixture();
      await oneEvent(element, 'highlighted');
      const code = element._code.innerText;
      assert.equal(code.indexOf('data=body'), -1);
    });
  });

  describe('_getHeaders()', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('Returns headers setting string', () => {
      const result = element._getHeaders([{
        name: 'x-test',
        value: 'value'
      }]);
      assert.equal(result, 'headers = {\'x-test\': \'value\'}\n');
    });
  });

  describe('_getPayload()', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('Returns payload setting string', () => {
      const result = element._getPayload('test');
      assert.notEqual(result.indexOf('body = """test"""'), -1);
    });
  });
});
