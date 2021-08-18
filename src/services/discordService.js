const Discord = require('discord.js')

module.exports.service = {
    id: 'discord',
    depends: [],
    start: async(bot) => {
        //Create bot instance
        bot.discord = new Discord.Client()

        //Register ready event
        bot.discord.on('ready', () => {
            this.service.ready = true;
            console.log('[discord] Discord service is ready!')
        });

        bot.discord.on('reconnecting', ()=> {
            console.log('[discord] Reconnecting...')
        });

        bot.discord.on('disconnect', () => {
            console.log('[discord] Disconnected!')
        });

        //Try Login
        bot.discord.login(bot.token);
    },
    stop: async(bot) => {
        bot.discord.destroy();
    }
}