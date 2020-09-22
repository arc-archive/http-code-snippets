import { BaseCodeSnippet, CodeHeader } from '../BaseCodeSnippet.js';

/**
 * `xhr-http-snippet`
 *
 * A snippet for requests made in JavaScript using XHR object.
 */
export class XhrHttpSnippetElement extends BaseCodeSnippet {
  readonly lang: string;
  constructor();

  /**
   * Computes code for JavaScript (XHR API).
   *
   * @returns Complete code for given arguments
   */
  _computeCommand(url: string, method: string, headers: CodeHeader[], payload: string): string;
}