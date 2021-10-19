import { fixture, assert, html, oneEvent } from '@open-wc/testing';
import '../python-27-http-snippet.js';

/** @typedef {import('../src/Python/Python27HttpSnippetElement').Python27HttpSnippetElement} Python27HttpSnippetElement */

describe('<python-27-http-snippet>', () => {
  /**
   * @returns {Promise<Python27HttpSnippetElement>}
   */
  async function basicFixture() {
    return (fixture(html`<python-27-http-snippet method="POST"
      url="http://domain.com" payload="test"></python-27-http-snippet>`));
  }

  /**
   * @returns {Promise<Python27HttpSnippetElement>}
   */
  async function noPayloadFixture() {
    return (fixture(html`<python-27-http-snippet method="GET"
      url="http://domain.com"></python-27-http-snippet>`));
  }

  describe('python-27-http-snippet', () => {
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
        'import httplib',
        '',
        'headers = {\'Content-Type\': \'application/json\',\'Accept\': \'application/json\'}',
        'body = """test"""',
        '',
        'conn = httplib.HTTPConnection(\'domain.com\')',
        'conn.request(\'POST\',\'/\', body, headers)',
        'res = conn.getresponse()',
        '',
        'print(res.status, res.reason)',
        'print(res.read())',
        'print(res.getheaders())'
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
      assert.equal(code.indexOf('headers: {'), -1);
    });

    it('No payload', async () => {
      const element = await noPayloadFixture();
      await oneEvent(element, 'highlighted');
      const code = element._code.innerText;
      assert.equal(code.indexOf('req.write(body)'), -1);
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
