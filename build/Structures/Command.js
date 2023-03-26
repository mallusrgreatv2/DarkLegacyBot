class Command {
    name;
    run;
    aliases;
    constructor(cmdoptions) {
        this.run = cmdoptions.run || [];
        this.name = cmdoptions.name;
        this.aliases = cmdoptions.aliases || [];
        return this;
    }
}
export default Command;
