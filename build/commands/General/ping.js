import Command from "../../Structures/Command.js";
export default new Command({
    name: "ping",
    run: async (client, message) => {
        await message.reply(`Pong! :ping_pong: (${client.ws.ping}ms)`);
    },
});
