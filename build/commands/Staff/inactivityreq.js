import { EmbedBuilder } from "@discordjs/builders";
import Command from "../../Structures/Command.js";
export default new Command({
    name: "inactivityreq",
    run: async (client, message, args) => {
        const reason = args.join(" ");
        if (!reason)
            return await message.reply("You have to specify a reason!");
        const embed = new EmbedBuilder()
            .setTitle("New Inactivity Request")
            .setDescription(`**STAFF**: <@${message.author.id}>\n**REASON**: ${reason}`);
        const msg = await client.channels.cache.get("1088547923027034172").send({
            embeds: [embed],
        });
        await msg.react("✅");
        await msg.react("❌");
    },
});
