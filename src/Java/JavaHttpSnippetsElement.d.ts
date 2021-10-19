import {LitElement, TemplateResult, CSSResult} from 'lit-element';
import { CodeHeader } from '../BaseCodeSnippet.js';

/**
 * `java-http-snippets`
 *
 * A set of code snippets for Java requests.
 */
export declare class JavaHttpSnippetsElement extends LitElement {
  readonly styles: CSSResult;
  /**
   * Currently selected snippet
   * @attribute
   */
  selected: number;

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
   */
  headers: CodeHeader[];

  /**
   * HTTP body (the message)
   * @attribute
   */
  payload: string;

  /**
   * Enables Anypoint theme.
   * @attribute
   */
  anypoint: boolean;
  constructor();
  
  render(): TemplateResult;

  /**
   * @returns Template for the current snippet
   */
  _renderPage(selected: number): TemplateResult|string;

  /**
   * Handler for `selected-changed` event dispatched on anypoint-tabs.
   */
  _selectedCHanged(e: CustomEvent): void;
}
