import { Message } from "discord.js";

import ICommand from "../interfaces/Command.js";
import Client from "./Client.js";

class Command implements ICommand {
  readonly name: string;
  readonly run: (client: Client, message: Message, args: string[]) => unknown;
  readonly hideInHelp: boolean = false;
  readonly devGuildOnly?: boolean = false;
  constructor(cmdoptions: ICommand) {
    this.run = cmdoptions.run || [];
    this.name = cmdoptions.name;
    return this;
  }
}

export default Command;
