import { fixture, assert, aTimeout } from '@open-wc/testing';
import '../java-spring-http-snippet.js';

describe('<java-spring-http-snippet>', function() {
  async function basicFixture() {
    return (await fixture(`<java-spring-http-snippet method="POST"
      url="http://domain.com" payload="test"></java-spring-http-snippet>`));
  }

  async function noPayloadFixture() {
    return (await fixture(`<java-spring-http-snippet method="GET"
      url="http://domain.com"></java-spring-http-snippet>`));
  }

  describe('java-spring-http-snippet', () => {
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
        'RestTemplate rest = new RestTemplate();',
        'HttpHeaders headers = new HttpHeaders();',
        'headers.add("Content-Type", "application/json");',
        'headers.add("Accept", "application/json");',
        '',
        'StringBuilder sb = new StringBuilder();',
        'sb.append("test\\n");',
        'String body = sb.toString();',
        '',
        'HttpEntity<String> requestEntity = new HttpEntity<String>(body, headers);',
        'ResponseEntity<String> responseEntity = rest.exchange("http://domain.com", ' +
          'HttpMethod.POST, requestEntity, String.class);',
        'int status = responseEntity.getStatusCode();',
        'String response = responseEntity.getBody();',
        'System.out.println("Response status: " + status);',
        'System.out.println(response);'
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
      assert.equal(code.indexOf('headers.add'), -1);
    });

    it('No payload', async () => {
      const element = await noPayloadFixture();
      await aTimeout();
      const code = element._code.innerText;
      assert.equal(code.indexOf('String body = sb.toString();'), -1);
      assert.notEqual(code.indexOf('String body = "";\n'), -1);
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
      assert.equal(result, 'headers.add("x-test", "value");\n');
    });
  });

  describe('_genPayloadPart()', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('Returns empty string when no payload', () => {
      const result = element._genPayloadPart();
      assert.equal(result, 'String body = "";\n');
    });

    it('Returns payload setting string', () => {
      const result = element._genPayloadPart('test');
      assert.notEqual(result.indexOf('new StringBuilder'), -1);
    });
  });
});