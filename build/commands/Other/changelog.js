import { EmbedBuilder } from "discord.js";
import Command from "../../Structures/Command.js";
export default new Command({
    name: "changelog",
    aliases: ["clog"],
    run: async (_client, message) => {
        if (!message.member?.roles.cache.has("1087811708178940024"))
            return;
        await message.reply("Gamemode? Reply to this message!\n Send `cancel` to cancel the process.");
        let info = {
            gamemode: undefined,
            changes: [],
            type: undefined,
        };
        const gamemodeComponent = message.channel.createMessageCollector({
            filter: m => m.author.id === message.author.id,
            max: 1,
            time: 15_000,
        });
        gamemodeComponent.on("collect", async (gamemodeMsg) => {
            if (gamemodeMsg.content.toLowerCase() === "cancel") {
                gamemodeComponent.stop("Cancelled");
                gamemodeMsg.reply("Cancelled.");
                return;
            }
            info.gamemode = gamemodeMsg.content;
            const typeComponent = message.channel.createMessageCollector({
                filter: m => m.author.id === message.author.id,
                max: 1,
                time: 15_000,
            });
            await gamemodeMsg.reply("Gamemode info collected. Send the type.\nTypes: `FIX` `ADD` `REMOVE` `CHANGE`\nReply `cancel` to cancel.");
            typeComponent.on("collect", async (typeMsg) => {
                if (typeMsg.content.toLowerCase() === "cancel") {
                    typeComponent.stop("Cancelled");
                    typeMsg.reply("Cancelled.");
                    return;
                }
                info.type = typeMsg.content;
                await typeMsg.reply(`Set type to \`${info.type}\`. Send changes.\nSend \`cancel\` to cancel.`);
                const changesComponent = message.channel.createMessageCollector({
                    filter: a => a.author.id === message.author.id,
                    dispose: false,
                });
                changesComponent.on("collect", async (changesMsg) => {
                    if (changesMsg.content.toLowerCase() === "cancel") {
                        changesComponent.stop("Cancelled");
                        changesMsg.reply("Cancelled.");
                        return;
                    }
                    if (changesMsg.content.toLowerCase() === "done" && info.changes.length) {
                        const embed = new EmbedBuilder()
                            .setTitle(`CHANGELOG - ${info.gamemode} - ${info.type}`)
                            .setDescription(info.changes.join("\n"))
                            .setTimestamp();
                        const channel = changesMsg.guild?.channels.cache.get("1057250412513734698");
                        await channel.send({ embeds: [embed] });
                        await changesMsg.reply("Sent!");
                        changesComponent.stop("Done");
                    }
                    else if (changesMsg.content.toLowerCase() === "done" && !info.changes.length) {
                        changesComponent.stop("Cancelled");
                        changesMsg.reply("Cancelled.");
                        return;
                    }
                    else if (changesMsg.content.toLowerCase() === "rmlast" && info.changes.length) {
                        const changelogRemoved = info.changes.pop();
                        await changesMsg.reply(`Removed changelog:\n\`${changelogRemoved}\`\nSend \`cancel\` to cancel.\nSend \`done\` after done.`);
                    }
                    else {
                        info.changes.push(changesMsg.content);
                        await changesMsg.reply("Added to the changelog. Reply `done` to send.\nReply `cancel` to cancel.\nReply `rmlast` to remove the last changelog.\nReply with anything else to add to the changelog.");
                    }
                });
            });
        });
    },
});
