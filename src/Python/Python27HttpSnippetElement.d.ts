import {BaseCodeSnippet, CodeHeader} from '../BaseCodeSnippet.js';

/**
 * `python-27-http-snippet`
 *
 * A snippet for requests made in Python 2.7 using native library.
 */
export class Python27HttpSnippetElement extends BaseCodeSnippet {
  readonly lang: string;
  constructor();

  /**
   * Computes code for Python (2.7).
   *
   * @returns Complete code for given arguments
   */
  _computeCommand(url: string, method: string, headers: CodeHeader[], payload: string): string;

  /**
   * @param headers List of headers
   * @returns Headers variable definition
   */
  _getHeaders(headers: CodeHeader[]): string;

  /**
   * @param payload HTTP body
   * @returns Body variable definition
   */
  _getPayload(payload: string): string;

  /**
   * Computes value of connection definition
   *
   * @param url HTTP request url
   * @param method HTTP request method
   * @param hasPayload True if the request contains payload message
   * @param hasHeaders True if the request contains headers
   */
  _getConnection(url: string, method: string, hasPayload: boolean, hasHeaders: boolean): string;

  /**
   * @returns Returns ending of the code definition
   */
  _getFooter(): string;
}