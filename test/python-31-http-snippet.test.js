import { fixture, assert, aTimeout } from '@open-wc/testing';
import '../python-31-http-snippet.js';

describe('<python-31-http-snippet>', function() {
  async function basicFixture() {
    return (await fixture(`<python-31-http-snippet method="POST"
      url="http://domain.com" payload="test"></python-31-http-snippet>`));
  }

  async function noPayloadFixture() {
    return (await fixture(`<python-31-http-snippet method="GET"
      url="http://domain.com"></python-31-http-snippet>`));
  }

  describe('python-31-http-snippet', () => {
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
        'import http.client',
        '',
        'headers = {\'Content-Type\': \'application/json\',\'Accept\': \'application/json\'}',
        'body = """test"""',
        '',
        'conn = http.client.HTTPConnection(\'domain.com\')',
        'conn.request(\'POST\',\'/\', body, headers)',
        'res = conn.getresponse()',
        '',
        'data = res.read()',
        'print(res.status, res.reason)',
        'print(data.decode(\'utf-8\'))',
        'print(res.getheaders())'
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
      assert.equal(code.indexOf('headers: {'), -1);
    });

    it('No payload', async () => {
      const element = await noPayloadFixture();
      await aTimeout();
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
