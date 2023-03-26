/* eslint-disable no-empty */
import Event from "../../Structures/Event.js";
export default new Event({
    event: "messageReactionAdd",
    run: async (client, reaction) => {
        if (reaction.partial) {
            reaction = await reaction.fetch();
        }
        if (reaction.me)
            return;
        if (reaction.message.embeds[0]?.title !== "New Inactivity Request")
            return;
        const id = reaction.message.embeds[0].footer?.text;
        if (!id)
            return await reaction.message.reply("Something went wrong. There is no ID in the footer.");
        const has = await client.db.has(id);
        if (!has)
            return;
        const member = (await client.db.get(id));
        const emoji = reaction.emoji;
        if (emoji.name === "✅") {
            const reactions = reaction.count;
            if (reactions <= 2)
                return;
            const mbr = reaction.message.guild?.members.cache.get(member);
            let final = `**Accepted** this request by <@${member}>.`;
            try {
                await mbr?.roles.add("1088547147886100531");
                final += " Gave user the role.";
            }
            catch (err) {
                client.logger.error(err);
            }
            try {
                await mbr?.send("Your inactivity request has been accepted.");
                final += " DMed the user about it.";
            }
            catch (err) { }
            await reaction.message.reply(final);
            return await client.db?.delete(id);
        }
        else if (emoji.name === "❌") {
            const reactions = reaction.count;
            if (reactions <= 2)
                return;
            await reaction.message.reply(`**Rejected** this request. Please DM the user.`);
            return await client.db?.delete(id);
        }
    },
});
