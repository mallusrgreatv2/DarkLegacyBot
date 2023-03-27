import chalk from "chalk";
import { ClientEvents } from "discord.js";
import fs from "fs";
import Client from "../interfaces/Client.js";
import Event from "../interfaces/Event.js";
console.log("EVENTS HANDLER HAS BEEN INITIATED:");
function EventHandler(client: Client): void {
  fs.readdir("./build/events", async (err, dirs) => {
    if (err) throw err;

    dirs.forEach(async dir => {
      const files = fs.readdirSync(`./build/events/${dir}`);

      files.forEach(async file => {
        const eventFile: Event<keyof ClientEvents> = await import(`../events/${dir}/${file}`).then(
          imported => imported.default
        );
        const { event } = eventFile;
        console.log(chalk.redBright(`[HANDLER - EVENTS] Loaded a file: ${file}`));

        try {
          client.on(event, (...args: ClientEvents[typeof event]) => eventFile.run(client, ...args));
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error(err);
        }
      });
    });
  });
}

export default EventHandler;
