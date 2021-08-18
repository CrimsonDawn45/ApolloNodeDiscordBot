module.exports.command = {
    name: 'help',
    aliases: ['h'],
    description: 'help command',
    usage: ['help','help <command>'],
    execute: async (bot, message, args) => {

        let channel = message.channel;
    
        if(args == undefined) {
    
            let cmdList = "**Commands:**\n```";
    
            bot.command.commands.forEach(command => {
                if(command != undefined) {
                    cmdList = cmdList + '\n' + command.name + ': ' + command.description;
                }
            });
    
            cmdList = cmdList + `\`\`\`**Use **\`"${bot.prefix}help <command>"\`** to see command usage.**`;
    
            channel.send(cmdList);
    
        } else {
    
            let name = args[0].toLowerCase();
    
            if(bot.command.getCommand(name) != undefined) {
                cmd = bot.command.getCommand(name);

                if(cmd.usage != undefined) {

                    if(cmd.usage.length > 1) {

                        let msg = `"${name}" Usage: \`${cmd.usage[0]}\``

                        for(let i = 1; i < cmd.usage.length; i++) {
                            msg = msg + ` OR \`${cmd.usage[i]}\``
                        }

                        channel.send(msg);

                    } else {

                        channel.send(`"${name}" Usage: \`${bot.prefix}${cmd.usage}\``);
                    }
                    
                } else {
                    channel.send(`"${name}" Does not have any defined usage!`)
                }
    
            } else {
    
                channel.send(`"${name}" is not a valid command.`)
            }
        }
    }
}