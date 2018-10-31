/**
 * DO NOT EDIT
 *
 * This file was automatically generated by
 *   https://github.com/Polymer/tools/tree/master/packages/gen-typescript-declarations
 *
 * To modify these typings, edit the source file(s):
 *   python-27-http-snippet.html
 */

/// <reference path="../polymer/types/polymer-element.d.ts" />
/// <reference path="base-code-snippet.d.ts" />
/// <reference path="prism-python-import.d.ts" />

declare namespace ApiElements {

  /**
   * `python-27-http-snippet`
   *
   * A snippet for requests made in Python 2.7 using native library.
   *
   * ### Styling
   *
   * See `http-code-snippets` for styling documentation.
   */
  class Python27HttpSnippet extends BaseCodeSnippet {
    readonly lang: any;

    /**
     * Computes code for Python (2.7).
     *
     * @returns Complete code for given arguments
     */
    _computeCommand(url: String|null, method: String|null, headers: Array<object|null>|null|undefined, payload: String|null): String|null;

    /**
     * @param headers List of headers
     * @returns Headers variable definition
     */
    _getHeaders(headers: Array<object|null>|null): String|null;

    /**
     * @param payload HTTP body
     * @returns Body variable definition
     */
    _getPayload(payload: String|null): String|null;

    /**
     * Computes value of connection definition
     *
     * @param url HTTP request url
     * @param method HTTP request method
     * @param hasPayload True if the request contains payload message
     * @param hasHeaders True if the request contains headers
     */
    _getConnection(url: String|null, method: String|null, hasPayload: Boolean|null, hasHeaders: Boolean|null): String|null;

    /**
     * @returns Returns ending of the code definition
     */
    _getFooter(): String|null;
  }
}

interface HTMLElementTagNameMap {
  "python-27-http-snippet": ApiElements.Python27HttpSnippet;
}
