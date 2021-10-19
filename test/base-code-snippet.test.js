/* eslint-disable arrow-body-style */
import { fixture, assert } from '@open-wc/testing';
import sinon from 'sinon';
import './base-class-element.js';

/** @typedef {import('./base-class-element').BaseClassElement} BaseClassElement */

describe('BaseCodeSnippet', () => {
  /**
   * @return {Promise<BaseClassElement>}
   */
  async function basicFixture() {
    return (fixture(`<base-class-element
      headers='[{"Content-Type": "application/json"}]'
      method="GET"
      url="http://domain.com"></base-class-element>`));
  }

  describe('urlDetails()', () => {
    it('computes URL details', async () => {
      const element = await basicFixture();
      const result = element.urlDetails('https://domain.com/path?a=b');
      assert.equal(result.path, '/path?a=b');
      assert.equal(result.port, '443');
      assert.equal(result.hostValue, 'domain.com');
    });
  });

  describe('_copyToClipboard()', () => {
    let element;

    beforeEach( async () => {
      element = await basicFixture();
      element._code.textContent = 'test-code';
    });

    it('Dispatches content-copy event', () => {
      const spy = sinon.spy();
      element.addEventListener('content-copy', spy);
      element._copyToClipboard();
      assert.isTrue(spy.calledOnce);
      assert.equal(spy.args[0][0].detail.value, 'test-code');
    });

    it('Calls execCommand() when event is not handled', () => {
      const spy = sinon.spy(document, 'execCommand');
      element._copyToClipboard();
      // @ts-ignore
      document.execCommand.restore();
      assert.isTrue(spy.calledOnce);
    });

    it('Won\'t call execCommand() when event is handled', () => {
      const spy = sinon.spy(document, 'execCommand');
      element.addEventListener('content-copy', function f(e) {
        element.removeEventListener('content-copy', f);
        e.preventDefault();
      });
      element._copyToClipboard();
      // @ts-ignore
      document.execCommand.restore();
      assert.isFalse(spy.calledOnce);
    });
  });
});
