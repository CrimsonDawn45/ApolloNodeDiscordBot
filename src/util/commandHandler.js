const fs = require('fs')
const path = require('path')

class CommandHandler {

    bot;
    commands;

    constructor(bot) {
        this.bot = bot;
        this.commands = [];

        //Automatically register commands
        let cmdDir = path.join(__dirname, 'commands')

        fs.readdir(cmdDir, (err, files) => {
            files.forEach(file => {
                this.commands.push(require('./commands/' + file))
            });
        });
    }

    handleCommand(message) {

        console.log(`User ${message.author.name} issued command \"${message.content}\"`)

        let words = message.content.trim().split(' ');

        if(words[0].startsWith(this.bot.prefix)) {  //Check for command

            let name = words[0].toLowerCase().replace(this.bot.prefix,'');
            let args = undefined;

            if(words.length > 1) {
                args = ([].concat(words));
                args.shift()
            }

            let command = this.getCommand(name)
            if(command != undefined) {
                command.command.execute(this.bot, message, args);
            } else {
                message.channel.send(`"${name}" is not a valid command.`)
            }
        }
    }

    getCommand(name) {
        let cmd = undefined;

        this.commands.forEach(command => {
            if(command.command.name == name) {
                cmd = command;
            }
        });

        return cmd;
    }
}

module.exports = {
    CommandHandler: CommandHandler
}