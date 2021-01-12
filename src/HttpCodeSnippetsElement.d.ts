
import { LitElement, TemplateResult, CSSResult } from 'lit-element';
import '@anypoint-web-components/anypoint-tabs/anypoint-tabs.js';
import '@anypoint-web-components/anypoint-tabs/anypoint-tab.js';
import '@polymer/prism-element/prism-highlighter.js';
import '../raw-http-snippet.js';
import '../curl-http-snippet.js';
import '../javascript-http-snippets.js';
import '../python-http-snippets.js';
import '../c-curl-http-snippet.js';
import '../java-http-snippets.js';
import { CodeHeader } from './BaseCodeSnippet';

/**
 * `http-code-snippets`
 *
 * Code snippets to display code implementation examples for a HTTP request
 */
export declare class HttpCodeSnippetsElement extends LitElement {
  readonly styles: CSSResult;

  /**
   * Currently selected tab for the platform row.
   * @attribute
   */
  selected: number;
  /**
   * Computed list of headers from `headers` property.
   * It is an array of objects where each object contains `name` and `value`
   * properties.
   */
  _headersList?: CodeHeader[];
  // Passed to `anypoint-tabs` `scrollable` property
  scrollable: boolean;
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
  headers: string;
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

  /**
   * Handler for `selected-changed` event dispatched on anypoint-tabs.
   */
  _selectedCHanged(e: CustomEvent): void;

  /**
   * Computes a list of headers from a headers string.
   * @param headersValue The headers to process
   * @returns Headers as a list od maps. Can be empty.
   */
  headersToList(headersValue: string): CodeHeader[];

  render(): TemplateResult;

  _snippetTemplate(): TemplateResult|string;
}
