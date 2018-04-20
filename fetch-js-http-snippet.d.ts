/**
 * DO NOT EDIT
 *
 * This file was automatically generated by
 *   https://github.com/Polymer/gen-typescript-declarations
 *
 * To modify these typings, edit the source file(s):
 *   fetch-js-http-snippet.html
 */

/// <reference path="../polymer/types/polymer-element.d.ts" />
/// <reference path="../paper-icon-button/paper-icon-button.d.ts" />
/// <reference path="../arc-icons/arc-icons.d.ts" />
/// <reference path="code-snippets-mixin.d.ts" />
/// <reference path="http-code-snippets-style.d.ts" />

declare namespace ApiElements {

  /**
   * `fetch-js-http-snippet`
   *
   * A snippet for requests made in JavaScript using Fetch API.
   *
   * ## Styling
   *
   * Custom property | Description | Default
   * ----------------|-------------|----------
   * `--http-code-snippets` | Mixin applied to this elment | `{}`
   */
  class FetchJsHttpSnippet extends
    ArcBehaviors.CodeSnippetsMixin(
    Polymer.Element) {

    /**
     * True if has either headers or payload or both.
     */
    readonly hasParams: boolean|null|undefined;
    _computeHasParams(headers: any, payload: any): any;
  }
}

interface HTMLElementTagNameMap {
  "fetch-js-http-snippet": ApiElements.FetchJsHttpSnippet;
}
