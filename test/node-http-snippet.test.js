import { fixture, assert, aTimeout } from '@open-wc/testing';
import '../node-http-snippet.js';

describe('<node-http-snippet>', function() {
  async function basicFixture() {
    return (await fixture(`<node-http-snippet method="POST"
      url="http://domain.com" payload="test"></node-http-snippet>`));
  }

  async function noPayloadFixture() {
    return (await fixture(`<node-http-snippet method="GET"
      url="http://domain.com"></node-http-snippet>`));
  }

  describe('node-http-snippet', () => {
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
        'const http = require(\'http\');',
        'const init = {',
        '  host: \'domain.com\',',
        '  path: \'/\',',
        '  port: 80,',
        '  method: \'POST\',',
        '  headers: {',
        '    \'Content-Type\': \'application/json\',',
        '    \'Accept\': \'application/json\'',
        '  }',
        '};',
        'const callback = function(response) {',
        '  let result = Buffer.alloc(0);',
        '  response.on(\'data\', function(chunk) {',
        '    result = Buffer.concat([result, chunk]);',
        '  });',
        '  ',
        '  response.on(\'end\', function() {',
        '    // result has response body buffer',
        '    console.log(str.toString());',
        '  });',
        '};',
        '',
        'const req = http.request(init, callback);',
        'const body = `test`;',
        'req.write(body);',
        'req.end();',
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
      assert.equal(code.indexOf('headers: {'), -1);
    });

    it('No payload', async () => {
      const element = await noPayloadFixture();
      await aTimeout();
      const code = element._code.innerText;
      assert.equal(code.indexOf('req.write(body)'), -1);
    });
  });

  describe('_genHeadersPart()', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('Returns empty string when no headers', () => {
      const result = element._genHeadersPart();
      assert.equal(result, '');
    });

    it('Returns headers setting string', () => {
      const result = element._genHeadersPart([{
        name: 'x-test',
        value: 'value'
      }]);
      assert.equal(result, '  headers: {\n    \'x-test\': \'value\'\n  }\n');
    });
  });

  describe('_genPayloadPart()', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('Returns empty string when no payload', () => {
      const result = element._genPayloadPart();
      assert.equal(result, '');
    });

    it('Returns payload setting string', () => {
      const result = element._genPayloadPart('test');
      assert.notEqual(result.indexOf('req.write(body)'), -1);
    });
  });
});
