import { fixture, assert, aTimeout } from '@open-wc/testing';
import '../http-code-snippets.js';

describe('<http-code-snippets>', function() {
  async function basicFixture() {
    return (await fixture(`<http-code-snippets headers="Content-Type: application/json"
      method="GET" url="http://domain.com"></http-code-snippets>`));
  }

  async function rawFixture() {
    return (await fixture(`<http-code-snippets selected="1"
      headers="Content-Type: application/json" method="GET" url="http://domain.com"></http-code-snippets>`));
  }

  async function javascriptFixture() {
    return (await fixture(`<http-code-snippets selected="2"
      headers="Content-Type: application/json" method="GET" url="http://domain.com"></http-code-snippets>`));
  }

  async function pythonFixture() {
    return (await fixture(`<http-code-snippets selected="3"
      headers="Content-Type: application/json" method="GET" url="http://domain.com"></http-code-snippets>`));
  }

  async function cCurlFixture() {
    return (await fixture(`<http-code-snippets selected="4"
      headers="Content-Type: application/json" method="GET" url="http://domain.com"></http-code-snippets>`));
  }

  async function javaFixture() {
    return (await fixture(`<http-code-snippets selected="5"
      headers="Content-Type: application/json" method="GET" url="http://domain.com"></http-code-snippets>`));
  }

  async function payloadFixture() {
    return (await fixture(`<http-code-snippets
      headers="Content-Type: application/json" method="POST"
      url="http://domain.com" payload="test"></http-code-snippets>`));
  }

  describe('http-code-snippets', () => {
    it('selected is 0 by default', async () => {
      const element = await basicFixture();
      assert.equal(element.selected, 0);
    });

    it('computes _headersList', async () => {
      const element = await basicFixture();
      assert.typeOf(element._headersList, 'array');
      assert.lengthOf(element._headersList, 1);
      const header = element._headersList[0];
      assert.equal(header.name, 'Content-Type');
      assert.equal(header.value, 'application/json');
    });

    it('Adds curl snippets by default', async () => {
      const element = await basicFixture();
      await aTimeout();
      const node = element.shadowRoot.querySelector('curl-http-snippet');
      assert.ok(node);
    });

    it('url is set on the panel', async () => {
      const element = await basicFixture();
      await aTimeout();
      const panel = element.shadowRoot.querySelector('curl-http-snippet');
      assert.equal(panel.url, 'http://domain.com');
    });

    it('method is set on the panel', async () => {
      const element = await basicFixture();
      await aTimeout();
      const panel = element.shadowRoot.querySelector('curl-http-snippet');
      assert.equal(panel.method, 'GET');
    });

    it('headers are set on the panel', async () => {
      const element = await basicFixture();
      await aTimeout();
      const panel = element.shadowRoot.querySelector('curl-http-snippet');
      assert.typeOf(panel.headers, 'array');
      assert.lengthOf(panel.headers, 1);
    });

    it('payload is set on the panel', async () => {
      const element = await payloadFixture();
      await aTimeout();
      const panel = element.shadowRoot.querySelector('curl-http-snippet');
      assert.equal(panel.method, 'POST');
      assert.equal(panel.payload, 'test');
    });

    it('Adds raw snippets to the DOM', async () => {
      const element = await rawFixture();
      await aTimeout();
      const node = element.shadowRoot.querySelector('raw-http-snippet');
      assert.ok(node);
    });

    it('Adds javascript snippets to the DOM', async () => {
      const element = await javascriptFixture();
      await aTimeout();
      const node = element.shadowRoot.querySelector('javascript-http-snippets');
      assert.ok(node);
    });

    it('Adds python snippets to the DOM', async () => {
      const element = await pythonFixture();
      await aTimeout();
      const node = element.shadowRoot.querySelector('python-http-snippets');
      assert.ok(node);
    });

    it('Adds c-curl snippet to the DOM', async () => {
      const element = await cCurlFixture();
      await aTimeout();
      const node = element.shadowRoot.querySelector('c-curl-http-snippet');
      assert.ok(node);
    });

    it('Adds java snippet to the DOM', async () => {
      const element = await javaFixture();
      await aTimeout();
      const node = element.shadowRoot.querySelector('java-http-snippets');
      assert.ok(node);
    });
    // it('Computes URL details', () => {
    //   const result = element.urlDetails('https://domain.com/path?a=b');
    //   assert.equal(result.path, '/path?a=b');
    //   assert.equal(result.port, 443);
    //   assert.equal(result.hostValue, 'domain.com');
    // });
  });
});
