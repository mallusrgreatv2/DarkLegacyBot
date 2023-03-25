import chalk from "chalk";
import fs from "fs";
console.log("EVENTS HANDLER HAS BEEN INITIATED:");
function EventHandler(client) {
    fs.readdir("./build/events", async (err, dirs) => {
        if (err)
            throw err;
        dirs.forEach(async (dir) => {
            const files = fs.readdirSync(`./build/events/${dir}`);
            files.forEach(async (file) => {
                const eventFile = await import(`../events/${dir}/${file}`).then(imported => imported.default);
                const { event } = eventFile;
                console.log(chalk.redBright `[HANDLER - EVENTS] Loaded a file: ${file}`);
                try {
                    client.on(event, (...args) => eventFile.run(client, ...args));
                }
                catch (err) {
                    // eslint-disable-next-line no-console
                    console.error(err);
                }
            });
        });
    });
}
export default EventHandler;
