import { fixture, assert, aTimeout } from '@open-wc/testing';
import '../raw-http-snippet.js';

describe('<raw-http-snippet>', function() {
  async function basicFixture() {
    return (await fixture(`<raw-http-snippet method="POST"
      url="http://domain.com" payload="test"></raw-http-snippet>`));
  }

  async function noPayloadFixture() {
    return (await fixture(`<raw-http-snippet method="GET"
      url="http://domain.com"></raw-http-snippet>`));
  }

  describe('raw-http-snippet', () => {
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
        'POST / HTTP/1.1',
        'Host: domain.com:80',
        'Content-Type: application/json',
        'Accept: application/json',
        '',
        'test',
        '',
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
      const lines = [
        'POST / HTTP/1.1',
        'Host: domain.com:80',
        '',
        'test',
        '',
        ''
      ];
      await aTimeout();
      const code = element._code.innerText;
      const result = code.split('\n');
      for (let i = 0; i < result.length; i++) {
        assert.equal(result[i], lines[i], `Line ${i} matches`);
      }
    });

    it('No payload', async () => {
      const element = await noPayloadFixture();
      const lines = [
        'GET / HTTP/1.1',
        'Host: domain.com:80',
        ''
      ];
      await aTimeout();
      const code = element._code.innerText;
      const result = code.split('\n');
      for (let i = 0; i < result.length; i++) {
        assert.equal(result[i], lines[i], `Line ${i} matches`);
      }
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
      assert.equal(result, 'x-test: value\n');
    });
  });

  describe('_genPayloadPart()', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('Returns empty string for no body', () => {
      const result = element._genPayloadPart();
      assert.equal(result, '');
    });

    it('Returns payload setting string', () => {
      const result = element._genPayloadPart('test');
      assert.notEqual(result.indexOf('test'), -1);
    });
  });
});
