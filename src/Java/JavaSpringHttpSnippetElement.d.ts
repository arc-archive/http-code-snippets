import { BaseCodeSnippet, CodeHeader } from '../BaseCodeSnippet.js';

/**
 * `java-spring-http-snippet`
 *
 * A snippet for requests made in Java using the spring functions
 */
export declare class JavaSpringHttpSnippetElement extends BaseCodeSnippet {
  readonly lang: any;

  /**
   * Computes code for JavaScript (Fetch API).
   * @returns Complete code for given arguments
   */
  _computeCommand(url: string, method: string, headers: CodeHeader[], payload: string): string;

  _genHeadersPart(headers: CodeHeader[]): string;

  /**
   * @param {string} payload 
   * @returns {string}
   */
  _genPayloadPart(payload: string): string;

  /**
   * @param {string} payload 
   * @returns {string[]}
   */
  _payloadToList(payload: string): string[];
}