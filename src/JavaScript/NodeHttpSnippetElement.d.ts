import { BaseCodeSnippet, CodeHeader } from '../BaseCodeSnippet.js';

/**
 * `node-http-snippet`
 *
 * A set of code snippets for Python requests.
 *
 * ### Styling
 *
 * See `http-code-snippets` for styling documentation.
 */
export class NodeHttpSnippetElement extends BaseCodeSnippet {
  readonly lang: string;

  /**
   * Computes code for JavaScript (Node).
   * @returns Complete code for given arguments
   */
  _computeCommand(url: string, method: string, headers: CodeHeader[], payload: string): string;
  _genHeadersPart(headers: CodeHeader[]): string;
  _genPayloadPart(payload: string): string;
}