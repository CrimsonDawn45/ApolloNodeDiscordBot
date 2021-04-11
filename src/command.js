const {Channel, User} = require('discord.js')

class CommandHandler {

    prefix;
    commands;

    constructor(prefix) {
        this.prefix = prefix;
        this.commands = [];
    }

    handleCommand(sender, channel, rawMessage) {

        let words = rawMessage.trim().split(' ');

        if(words[0].startsWith(this.prefix)) {  //Check for command

            let label = words[0].toLowerCase().replace(this.prefix,'');
            let args = undefined;

            if(words.length > 1) {
                args = ([].concat(words));
                args.shift()
            }

            let foundCmd = false;

            this.commands.forEach(command => {
                if(command.label == label) {
                    foundCmd = true;
                    command.execute(sender, channel, args);
                }
            });

            if(!foundCmd) {
                channel.send(`"${label}" is not a valid command.`)
            }
        }
    }

    register(command) {
        this.commands.push(command)
    }

    getCommand(label) {
        let cmd = undefined;

        this.commands.forEach(command => {
            if(command.label == label) {
                cmd = command;
            }
        });

        return cmd;
    }
}

class Command {

    label;
    description;
    usage;
    onExecute;

    constructor(label, description, usage) {
        this.label = label;
        this.description = description;
        this.usage = usage;
    }

    execute(sender, channel, args) {}
}

module.exports = {
    Command: Command,
    CommandHandler: CommandHandler
}