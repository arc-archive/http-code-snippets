/**
 * DO NOT EDIT
 *
 * This file was automatically generated by
 *   https://github.com/Polymer/tools/tree/master/packages/gen-typescript-declarations
 *
 * To modify these typings, edit the source file(s):
 *   curl-http-snippet.js
 */


// tslint:disable:variable-name Describing an API that's defined elsewhere.
// tslint:disable:no-any describes the API as best we are able today

import {BaseCodeSnippet} from './base-code-snippet.js';

declare namespace ApiElements {

  /**
   * `curl-http-snippet`
   *
   * A snippet for curl command in bash.
   *
   * ### Styling
   *
   * See `http-code-snippets` for styling documentation.
   */
  class CurlHttpSnippet extends BaseCodeSnippet {
    readonly lang: any;
    constructor();

    /**
     * Computes command for cURL.
     *
     * @returns Complete cURL command for given arguments
     */
    _computeCommand(url: String|null, method: String|null, headers: Array<object|null>|null|undefined, payload: String|null): String|null;
  }
}

declare global {

  interface HTMLElementTagNameMap {
    "curl-http-snippet": ApiElements.CurlHttpSnippet;
  }
}
