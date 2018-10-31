/**
 * DO NOT EDIT
 *
 * This file was automatically generated by
 *   https://github.com/Polymer/tools/tree/master/packages/gen-typescript-declarations
 *
 * To modify these typings, edit the source file(s):
 *   java-spring-http-snippet.html
 */

/// <reference path="../polymer/types/polymer-element.d.ts" />
/// <reference path="base-code-snippet.d.ts" />
/// <reference path="prism-java-import.d.ts" />

declare namespace ApiElements {

  /**
   * `java-spring-http-snippet`
   *
   * A snippet for requests made in Java using the spring functions
   *
   * ### Styling
   *
   * See `http-code-snippets` for styling documentation.
   */
  class JavaSpringHttpSnippet extends BaseCodeSnippet {
    readonly lang: any;

    /**
     * Computes code for Java (Spring).
     *
     * @returns Complete code for given arguments
     */
    _computeCommand(url: String|null, method: String|null, headers: Array<object|null>|null|undefined, payload: String|null): String|null;
    _payloadToList(payload: any): any;
  }
}

interface HTMLElementTagNameMap {
  "java-spring-http-snippet": ApiElements.JavaSpringHttpSnippet;
}
