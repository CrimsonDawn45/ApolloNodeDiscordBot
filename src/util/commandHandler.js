const fs = require('fs')
const path = require('path')

class CommandHandler {

    bot;
    commands;

    constructor(bot) {
        this.bot = bot;
        this.commands = [];

        //Automatically register commands
        let cmdDir = path.join(__dirname, '../commands')

        let files = fs.readdirSync(cmdDir)

        console.log('Loading Commands...')
        console.log('----------------------------')

        files.forEach(file => {

            console.log(`Found command file: \"${file}\"`)

            //Load Command
            let loadedCommand = undefined;

            //Try to parse file
            try {
                loadedCommand = require('../commands/' + file).command
            } catch (error) {
                console.log(`\nFile \".\\commands\\${file}\" is not a valid nodejs module!!!\n`)
                process.exit(0);
            }

            //Append command to list
            this.commands.push(loadedCommand);
            console.log(`   loaded command: ${file}\n`)
        });
    }

    handleCommand(message) {

        let words = message.content.trim().split(' ');

        if(words[0].startsWith(this.bot.prefix) && !message.author.bot) {  //Check for command

            console.log(`[command] User ${message.author.username} issued command \"${message.content}\"`)

            let name = words[0].toLowerCase().replace(this.bot.prefix,'');
            let args = undefined;

            if(words.length > 1) {
                args = ([].concat(words));
                args.shift()
            }

            let command = this.getCommand(name)
            if(command != undefined) {
                command.execute(this.bot, message, args);
            } else {
                message.channel.send(`"${name}" is not a valid command.`)
            }
        }
    }

    getCommand(name) {

        let result = undefined;

        this.commands.forEach(command => {

            if(command.name == name) {  //Check full name
                result = command;
            }

            if(command.aliases != undefined) {  //Check aliases
                command.aliases.forEach(alias => {
                    if(alias == name) {
                        result = command;
                    }
                });
            }
            
        });

        return result;
    }
}

module.exports = {
    CommandHandler: CommandHandler
}