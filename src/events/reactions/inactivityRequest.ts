import Event from "../../Structures/Event.js";

export default new Event({
  event: "messageReactionAdd",
  run: async (client, reaction) => {
    if (reaction.partial) {
      reaction = await reaction.fetch();
    }
    if (reaction.message.embeds[0]?.title !== "New Inactivity Request") return;
    const reactions = reaction.message.reactions.cache.size;
    console.log(reactions);
    if (reactions === 3) {
      const emoji = reaction.emoji;
      if (emoji.name === "✅") {
        await reaction.message.reply(`**Accepted** this request. Please DM the user.`);
      } else if (emoji.name === "❌") {
        await reaction.message.reply(`**Rejected** this request. Please DM the user.`);
      }
    }
  },
});
