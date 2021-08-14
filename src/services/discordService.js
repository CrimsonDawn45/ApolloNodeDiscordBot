const Discord = require('discord.js')

module.exports.service = {
    id: 'discord',
    depends: [],
    start: async(bot) => {
        //Create bot instance
        bot.discord = new discord.Client()

        //Register ready event
        bot.discord.on('ready', () => {
            this.service.ready = true;
            console.log('[discord] discord service is ready!')
        })

        //Try Login
        bot.discord.login(bot.token);
    },
    stop: async(bot) => {
        bot.discord.destroy();
    }
}