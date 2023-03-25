import { Client as BaseClient, ClientUser, Collection } from "discord.js";
import Command from "./Command.js";
import ClientConfig from "./ClientConfig.js";
import Logger from "../Structures/Logger.js";
interface Client extends BaseClient {
  readonly commands: Collection<string, Command>;
  user: ClientUser;
  config: ClientConfig;
  init: () => Promise<void>;
  logger: Logger;
}

export default Client;
