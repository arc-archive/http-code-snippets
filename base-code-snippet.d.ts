/**
 * DO NOT EDIT
 *
 * This file was automatically generated by
 *   https://github.com/Polymer/tools/tree/master/packages/gen-typescript-declarations
 *
 * To modify these typings, edit the source file(s):
 *   base-code-snippet.js
 */


// tslint:disable:variable-name Describing an API that's defined elsewhere.
// tslint:disable:no-any describes the API as best we are able today

import {PolymerElement} from '@polymer/polymer/polymer-element.js';

export {BaseCodeSnippet};

declare namespace ApiElements {

  /**
   * `base-code-snippet`
   *
   * A class to be used to extend other code snippets elements.
   *
   * Each child class has to have `lang` property to be used to recognize the
   * syntax. If syntax is different than the default PrismJs set then it has to
   * be imported into the DOM.
   *
   * Each child class must implement `_processCommand()` function which results
   * to a code to highlight. It takes 4 attributes (in order): url, method,
   * headers, and payload.
   * Mind that all atguments are optional.
   *
   * If the child class implements it's own template, it should contain
   * `<code></code>` inside the template where the highlighted value is
   * added.
   *
   * Parent element, presumably `http-code-snippets`, or main document
   * must include `prism-element/prism-highlighter.html` in it's DOM.
   *
   * ### Styling
   *
   * See `http-code-snippets` for styling documentation.
   */
  class BaseCodeSnippet extends PolymerElement {
    readonly _code: any;

    /**
     * Request URL
     */
    url: string|null|undefined;

    /**
     * HTTP method
     */
    method: string|null|undefined;

    /**
     * Parsed HTTP headers.
     * Each item contains `name` and `value` properties.
     */
    headers: Array<object|null>|null;

    /**
     * HTTP body (the message)
     */
    payload: string|null|undefined;
    connectedCallback(): void;
    disconnectedCallback(): void;

    /**
     * Clears timeout from the debouncer if set.
     */
    _clearValueTimeout(): void;

    /**
     * Computes code value with debouncer set to 25 ms.
     */
    _valuesChanged(url: String|null, method: String|null, headers: Array<object|null>|null|undefined, payload: String|null|undefined): void;

    /**
     * Processes command by calling, respectively, `_computeCommand()` and
     * `_highlight()`. The result is added to the `<code>` block in the template.
     */
    _processCommand(url: String|null, method: String|null, headers: Array<object|null>|null|undefined, payload: String|null|undefined): void;
    _computeCommand(): void;
    _highlight(code: any, lang: any): any;

    /**
     * Reads the host, port and path from the url.
     * This function uses URI library to parse the URL so you have to
     * include this library from bower_components if the element want to use it.
     */
    urlDetails(url: String|null): object|null;
    _copyToClipboard(): void;
  }
}

declare global {

  interface HTMLElementTagNameMap {
    "base-code-snippet": ApiElements.BaseCodeSnippet;
  }
}
