/**
@license
Copyright 2018 The Advanced REST client authors <arc@mulesoft.com>
Licensed under the Apache License, Version 2.0 (the "License"); you may not
use this file except in compliance with the License. You may obtain a copy of
the License at
http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
License for the specific language governing permissions and limitations under
the License.
*/
import { LitElement, TemplateResult, CSSResult } from 'lit-element';
import httpStyles from './BaseStyles.js';

export declare interface CodeHeader {
  name: string;
  value: string;
}

export declare interface UrlDetails {
  path: string;
  port: string;
  hostValue: string;
  autoPort?: boolean;
}

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
 * Mind that all arguments are optional.
 *
 * If the child class implements it's own template, it should contain
 * `<code></code>` inside the template where the highlighted value is
 * added.
 *
 * Parent element, presumably `http-code-snippets`, or main document
 * must include `prism-element/prism-highlighter.html` in it's DOM.
 */
export declare abstract class BaseCodeSnippet extends LitElement {
  static readonly _httpStyles: CSSResult;
  styles: CSSResult;
  /**
   * Request URL
   * @attribute
   */
  url: string;
  /**
   * HTTP method
   * @attribute
   */
  method: string;
  /**
   * Parsed HTTP headers.
   * Each item contains `name` and `value` properties.
   * @attribute
   */
  headers: CodeHeader[];
  /**
   * HTTP body (the message)
   * @attribute
   */
  payload: string;
  /**
   * Enables compatibility with Anypoint components.
   * @attribute
   */
  compatibility: boolean;

  render(): TemplateResult;

  readonly _code: HTMLElement;

  connectedCallback(): void;

  disconnectedCallback(): void;

  /**
   * Clears timeout from the debouncer if set.
   */
  _clearValueTimeout(): void;

  /**
   * Computes code value with debouncer.
   */
  _valuesChanged(): void;

  /**
   * Processes command by calling, respectively, `_computeCommand()` and
   * `_highlight()`. The result is added to the `<code>` block in the template.
   */
  _processCommand(): void;

  abstract _computeCommand(url: string, method: string, headers: CodeHeader[], payload: string): string;

  /**
   * Dispatches `syntax-highlight` event to highlight the syntax.
   * @param {string} code 
   * @param {string} lang 
   * @returns {string}
   */
  _highlight(code: string, lang: string): string;

  /**
   * Reads the host, port and path from the url.
   * This function uses URI library to parse the URL so you have to
   * include this library from bower_components if the element want to use it.
   */
  urlDetails(value: string): UrlDetails;

  _copyToClipboard(): void;

  /**
   * Sends the `content-copy` event.
   * If the event is canceled then the logic from this element won't be
   * executed. Useful if current platform doesn't support `execCommand('copy')`
   * and has other way to manage clipboard.
   *
   * @param value The value to dispatch with the event.
   * @returns True if handler executed copy function.
   */
  _beforeCopy(value: string): boolean;
}