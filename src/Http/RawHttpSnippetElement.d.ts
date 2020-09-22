import { BaseCodeSnippet, CodeHeader } from '../BaseCodeSnippet.js';

/**
 * `raw-http-snippet`
 *
 * Code snippet to display raw HTTP message
 *
 * ### Styling
 *
 * See `http-code-snippets` for styling documentation.
 */
export class RawHttpSnippetElement extends BaseCodeSnippet {
  readonly lang: any;
  constructor();

  /**
   * Computes bas command for cURL.
   *
   * @returns Complete cURL command for given arguments
   */
  _computeCommand(url: string, method: string, headers: CodeHeader[], payload: string): string;
  _genHeadersPart(headers: CodeHeader[]): string;
  _genPayloadPart(payload: string): string;
}