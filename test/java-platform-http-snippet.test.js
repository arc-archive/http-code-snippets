import { fixture, assert, html, oneEvent } from '@open-wc/testing';
import '../java-platform-http-snippet.js';

/** @typedef {import('../src/Java/JavaPlatformHttpSnippetElement').JavaPlatformHttpSnippetElement} JavaPlatformHttpSnippetElement */

describe('<java-platform-http-snippet>', () => {
  /**
   * @returns {Promise<JavaPlatformHttpSnippetElement>}
   */
  async function basicFixture() {
    return (fixture(html`<java-platform-http-snippet method="POST"
      url="http://domain.com" payload="test\nmultiline"></java-platform-http-snippet>`));
  }

  /**
   * @returns {Promise<JavaPlatformHttpSnippetElement>}
   */
  async function noPayloadFixture() {
    return (fixture(html`<java-platform-http-snippet method="GET"
      url="http://domain.com"></java-platform-http-snippet>`));
  }

  describe('java-platform-http-snippet', () => {
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
        'URL url = new URL("http://domain.com");',
        'HttpURLConnection con = (HttpURLConnection) url.openConnection();',
        'con.setRequestMethod("POST");',
        'con.setRequestProperty("Content-Type", "application/json");',
        'con.setRequestProperty("Accept", "application/json");',
        '',
        '/* Payload support */',
        'con.setDoOutput(true);',
        'DataOutputStream out = new DataOutputStream(con.getOutputStream());',
        'out.writeBytes("test\\n");',
        'out.writeBytes("multiline");',
        'out.flush();',
        'out.close();',
        '',
        'int status = con.getResponseCode();',
        'BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));',
        'String inputLine;',
        'StringBuffer content = new StringBuffer();',
        'while((inputLine = in.readLine()) != null) {',
        '\tcontent.append(inputLine);',
        '}',
        'in.close();',
        'con.disconnect();',
        'System.out.println("Response status: " + status);',
        'System.out.println(content.toString());'
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
      assert.equal(code.indexOf('setRequestProperty'), -1);
    });

    it('No payload', async () => {
      const element = await noPayloadFixture();
      await oneEvent(element, 'highlighted');
      const code = element._code.innerText;
      assert.equal(code.indexOf('DataOutputStream ='), -1);
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
      assert.equal(result, 'con.setRequestProperty("x-test", "value");\n');
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
      const result = element._genPayloadPart('test\nmultiple');
      assert.include(result, 'out.writeBytes("test\\n");\n');
      assert.include(result, 'out.writeBytes("multiple");\n');
    });
  });
});
