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

import { BaseCodeSnippet, CodeHeader } from '../BaseCodeSnippet.js';

/**
 * `fetch-js-http-snippet`
 *
 * A snippet for requests made in JavaScript using Fetch API.
 */
export declare class FetchJsHttpSnippetElement extends BaseCodeSnippet {
  readonly lang: string;

  /**
   * Computes code for JavaScript (Fetch API).
   * @returns Complete code for given arguments
   */
  _computeCommand(url: string, method: string, headers: CodeHeader[], payload: string): string;

  _createHeaders(headers: CodeHeader[]): string;

  _createPayload(payload: string): string;
}