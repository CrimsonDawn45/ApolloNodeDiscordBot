const {CommandHandler} = require('../util/commandHandler')

module.exports.command = {
    name: 'reload',
    description: 'loads new commands. To reload already loaded commands restart needed',
    usage: ['reload'],
    execute: async (bot, message, args) => {

        bot.command.loadCommands(bot);
    }
}