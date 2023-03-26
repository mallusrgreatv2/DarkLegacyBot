import { Message } from "discord.js";

import ICommand from "../interfaces/Command.js";
import Client from "./Client.js";

class Command implements ICommand {
  readonly name: string;
  readonly run: (client: Client, message: Message, args: string[]) => unknown;
  readonly aliases: string[];
  constructor(cmdoptions: ICommand) {
    this.run = cmdoptions.run || [];
    this.name = cmdoptions.name;
    this.aliases = cmdoptions.aliases || [];
    return this;
  }
}

export default Command;
