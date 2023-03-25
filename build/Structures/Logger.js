import chalk from "chalk";
class Logger {
    log(...messages) {
        if (!messages?.length)
            return console.log(chalk.bgRed("No messages to log."));
        console.log(chalk.bgWhite.black("[INFO]"), messages.join(" "));
    }
    error(...messages) {
        if (!messages?.length)
            return console.log(chalk.bgRed("No messages to log errors."));
        console.log(chalk.bgRed.whiteBright("[ERROR]"), messages.join(" "));
    }
    info(...messages) {
        if (!messages?.length)
            return console.log(chalk.bgRed("No messages to log info."));
        console.log(chalk.whiteBright.bgCyan("[INFO]"), messages.join(" "));
    }
    warn(...messages) {
        if (!messages?.length)
            return console.log(chalk.bgRed("No messages to log warning."));
        console.log(chalk.bgYellow.blackBright("[WARN]"), messages.join(" "));
    }
}
export default Logger;
