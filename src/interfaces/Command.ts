/**
 * Copyright (c) Craftilities
 *
 * This source code is licensed under the AGPL v3 license found in the
 * LICENSE file in the root directory of this source tree.
 * https://github.com/AtlasDevelopmentLLC/Craftilities/blob/main/LICENSE
 */
import { Message } from "discord.js";
import Client from "../Structures/Client.js";

interface Command {
  readonly name: string;
  readonly aliases?: string[];
  readonly run: (client: Client, message: Message, args: string[] | []) => unknown;
}

export default Command;
