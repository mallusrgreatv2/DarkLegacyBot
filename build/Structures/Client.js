import Discord from "discord.js";
import CommandHandler from "../handlers/CommandHandler.js";
import EventHandler from "../handlers/EventHandler.js";
import Logger from "./Logger.js";
import dotenv from "dotenv";
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
    }
    user = this.user;
    config = process.env;
    logger = new Logger();
    async init() {
        await CommandHandler(this);
        await EventHandler(this);
        await this.login(this.config.TOKEN);
    }
}
export default Bot;
