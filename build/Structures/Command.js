class Command {
    name;
    run;
    hideInHelp = false;
    devGuildOnly = false;
    constructor(cmdoptions) {
        this.run = cmdoptions.run || [];
        this.name = cmdoptions.name;
        return this;
    }
}
export default Command;
