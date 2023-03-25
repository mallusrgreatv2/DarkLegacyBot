import Discord, { ClientUser } from "discord.js";
import ClientConfig from "../interfaces/ClientConfig";
import CommandHandler from "../handlers/CommandHandler.js";
import EventHandler from "../handlers/EventHandler.js";
import Command from "../interfaces/Command";
import Logger from "./Logger.js";
import dotenv from "dotenv";
dotenv.config();
class Bot extends Discord.Client {
  public readonly commands: Discord.Collection<string, Command>;
  constructor() {
    super({
      intents: [
        "MessageContent",
        "GuildMessages",
        "Guilds",
        "GuildMembers",
        "GuildMessages",
        "GuildMessageReactions",
      ],
      allowedMentions: { parse: ["users"] },
      partials: [
        Discord.Partials.Reaction,
        Discord.Partials.Channel,
        Discord.Partials.GuildMember,
        Discord.Partials.Message,
        Discord.Partials.User,
      ],
    });
    this.commands = new Discord.Collection<string, Command>();
  }
  user = this.user as ClientUser;
  config = process.env as unknown as ClientConfig;
  logger = new Logger();
  async init() {
    await CommandHandler(this);
    await EventHandler(this);
    await this.login(this.config.TOKEN);
  }
}
export default Bot;
