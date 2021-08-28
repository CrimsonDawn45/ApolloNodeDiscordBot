const fs = require('fs')
const path = require('path')
//const {PermissionHandler} = require('../util/permissionHandler')

class CommandHandler {

    bot;
    //permHandler;
    commands;

    constructor(bot) {
        this.loadCommands(bot);
       // this.permHandler = new PermissionHandler(bot, this.commands);
    }

    loadCommands(bot) {
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

                //Append command to list
                this.commands.push(loadedCommand);
                console.log(`   loaded command: ${file}\n`)

            } catch (error) {

                console.log(`\nFile \".\\commands\\${file}\" failed to be imported!, Skipping file!\n`) //Make it ignore bad files and keep going
            }
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