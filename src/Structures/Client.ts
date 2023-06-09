import Discord, { ClientUser } from "discord.js";
import ClientConfig from "../interfaces/ClientConfig";
import CommandHandler from "../handlers/CommandHandler.js";
import EventHandler from "../handlers/EventHandler.js";
import Command from "../interfaces/Command";
import Logger from "./Logger.js";
import dotenv from "dotenv";
import { MySQLDriver } from "quick.db";
import { QuickDB } from "quick.db";
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

    this.db = null;
  }
  user = this.user as ClientUser;
  config = process.env as unknown as ClientConfig;
  logger = new Logger();
  db: QuickDB | null;
  async init() {
    const mysqlDriver = new MySQLDriver({
      host: this.config.MYSQL_HOST,
      user: this.config.MYSQL_USERNAME,
      password: this.config.MYSQL_PASSWORD,
      database: this.config.MYSQL_DB,
      port: this.config.MYSQL_PORT,
      enableKeepAlive: true,
    });
    await mysqlDriver.connect();
    this.db = new QuickDB({
      driver: mysqlDriver,
    });
    await CommandHandler(this);
    await EventHandler(this);
    await this.login(this.config.TOKEN);
  }
}
export default Bot;
