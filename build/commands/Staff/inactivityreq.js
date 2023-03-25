import { EmbedBuilder } from "@discordjs/builders";
import Command from "../../Structures/Command.js";
export default new Command({
    name: "inactivityreq",
    run: async (client, message, args) => {
        const reason = args.join(" ");
        if (!reason)
            return await message.reply("You have to specify a reason!");
        const id = makeid(5);
        const embed = new EmbedBuilder()
            .setTitle("New Inactivity Request")
            .setDescription(`**STAFF**: <@${message.author.id}>\n**REASON**: ${reason}`)
            .setFooter({ text: id });
        await client.db.set(id, message.author.id);
        const msg = await client.channels.cache.get("1088547923027034172").send({
            embeds: [embed],
            content: "<@&1087811708178940024>",
        });
        await msg.react("✅");
        await msg.react("❌");
    },
});
function makeid(length) {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}
