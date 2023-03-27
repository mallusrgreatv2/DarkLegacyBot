import chalk from "chalk";
import fs from "fs";
import Client from "../interfaces/Client.js";
import Command from "../interfaces/Command.js";
console.log("COMMANDS HANDLER HAS BEEN INITIATED:");
function CommandHandler(client: Client): void {
  fs.readdirSync("./build/commands").forEach(async dir => {
    const commands = fs.readdirSync(`./build/commands/${dir}`).filter(file => file.endsWith(".js"));

    for (const file of commands) {
      const command: Command = await import(`../commands/${dir}/${file}`).then(
        imported => imported.default
      );

      client.commands.set(command.name, command);
      console.log(`Dir:`, dir);
      console.log(
        chalk.blueBright(
          `[HANDLER - SLASH] Loaded a file: ${dir}/${file} (#${client.commands.size})`
        )
      );
    }
  });
}

export default CommandHandler;
