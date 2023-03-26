import Discord from "discord.js";
import CommandHandler from "../handlers/CommandHandler.js";
import EventHandler from "../handlers/EventHandler.js";
import Logger from "./Logger.js";
import dotenv from "dotenv";
import { MySQLDriver } from "quick.db";
import { QuickDB } from "quick.db";
dotenv.config();
class Bot extends Discord.Client {
    commands;
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
        this.commands = new Discord.Collection();
        this.db = null;
    }
    user = this.user;
    config = process.env;
    logger = new Logger();
    db;
    async init() {
        const mysqlDriver = new MySQLDriver({
            host: "db.darklegacymc.tk",
            user: "u18_zQ2vEVRjaB",
            password: "PycaYup!zn!1C40@wyR^GmgI",
            database: "s18_dat",
            port: 3306,
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
