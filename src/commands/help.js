module.exports.command = {
    name: 'help',
    aliases: ['h'],
    description: 'help command',
    usage: ['help','help <command>'],
    execute: async (bot, message, args) => {

        let channel = message.channel;
    
        if(args == undefined) {
    
            let cmdList = "List of Commands:\n```";
    
            bot.command.commands.forEach(command => {
                cmdList = cmdList + '\n' + command.command.name + ': ' + command.command.description;
            });
    
            cmdList = cmdList + `\`\`\`Use "${bot.prefix}help <command>" to see command usage.`;
    
            channel.send(cmdList);
    
        } else {
    
            let name = args[0].toLowerCase();
    
            if(bot.command.getCommand(name) != undefined) {
                cmd = bot.command.getCommand(name);
    
                channel.send(`"${name}" Usage: \`${bot.prefix}${cmd.config.usage}\``);
    
            } else {
    
                channel.send(`"${name}" is not a valid command.`)
            }
        }
    }
}