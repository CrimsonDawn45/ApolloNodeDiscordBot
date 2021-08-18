const {CommandHandler} = require('../util/commandHandler')
const Discord = require('discord.js')

module.exports.service = {
    id: 'command',
    depends: ['discord', 'music'],
    start: async(bot) => {
        bot.command = new CommandHandler(bot)

        bot.discord.on('message', (message) =>{
            bot.command.handleCommand(message)
        });

        this.service.ready = true;  //This whole service is just a CommandHandler instance so just telling the serviceHandler that everything is all good should be fine.
    },
    stop: async(bot) => {}
}