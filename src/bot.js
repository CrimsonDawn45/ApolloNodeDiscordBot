const discord = require('discord.js');
const command = require('./command.js');

//Grab Token
require('dotenv').config();
const token = process.env.DISCORD_BOT_TOKEN;
const prefix = process.env.DISCORD_BOT_EXECUTION_PREFIX;

//Create client instance
const client = new discord.Client()

//Create CommandExecutor instance
const handler = new command.CommandHandler(prefix)

//Register ping command
var ping = new command.Command('ping','A nice little test command',`${prefix}ping`)
ping.execute = (sender, channel, args) => {
    channel.send('Pong!')
}
handler.register(ping);

//Register echo command
var echo = new command.Command('echo','repeats whatever you say',`${prefix}echo <message>`)
echo.execute = (sender, channel, args) => {

    if(args != undefined) {
        channel.send(args.join(' '))
    } else {
        channel.send('Message cannot be empty.')
    }
}
handler.register(echo);

//Register help command
var help = new command.Command('help','help command',`${prefix}help || ${prefix}help <command>`)
help.execute = (sender, channel, args) => {

    if(args == undefined) {

        let cmdList = "List of Commands:\n```";

        handler.commands.forEach(command => {
            cmdList = cmdList + '\n' + command.label + ': ' + command.description;
        });

        cmdList = cmdList + `\`\`\`Use "${prefix}help <command>" to see command usage.`;

        channel.send(cmdList);

    } else {

        let label = args[0].toLowerCase();

        if(handler.getCommand(label) != undefined) {
            cmd = handler.getCommand(label);

            channel.send(`"${label}" Usage: \`${cmd.usage}\``);

        } else {

            channel.send(`"${label}" is not a valid command.`)
        }
    }
}
handler.register(help);

client.on('ready', () => {
    console.log('I am ready');
})

client.on('message', (msg) => {
    if(!msg.author.bot) {
        handler.handleCommand(msg.author, msg.channel, msg.content);
    }
})

client.login(token)