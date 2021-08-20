module.exports.command = {
    name: 'reload',
    description: 'reloads command list',
    usage: ['reload'],
    execute: async (bot, message, args) => {
        bot.command.loadCommands(bot);
    }
}