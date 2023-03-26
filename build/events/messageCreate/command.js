/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Event from "../../Structures/Event.js";
export default new Event({
    event: "messageCreate",
    run: async (client, message) => {
        const prefix = "!";
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const command = args?.shift()?.toLowerCase();
        if (!command)
            return;
        if (!message.content.startsWith(prefix))
            return;
        const cmd = client.commands.get(command) || client.commands.find(a => a.aliases?.includes(command));
        try {
            await cmd?.run(client, message, args);
        }
        catch (err) {
            console.log(err);
            await message.reply("An error occured. Logged on console.");
        }
    },
});
