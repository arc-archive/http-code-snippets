import {LitElement, TemplateResult, CSSResult} from 'lit-element';
import { CodeHeader } from '../BaseCodeSnippet.js';

/**
 * `python-http-snippets`
 *
 * A set of code snippets for Python requests.
 */
export class PythonHttpSnippetsElement extends LitElement {
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
   * Enables compatibility with Anypoint components.
   * @attribute
   */
  compatibility: boolean;
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
