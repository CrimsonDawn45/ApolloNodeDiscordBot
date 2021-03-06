const Discord = require('discord.js')

module.exports.service = {
    id: 'discord',
    start: async(bot) => {
        //Create bot instance
        bot.discord = new Discord.Client()

        //Ready Event
        bot.discord.on('ready', () => {
            this.service.ready = true;
            console.log('[discord] Discord service is ready!')
        });

        //Reconnecting Event
        bot.discord.on('reconnecting', ()=> {
            console.log('[discord] Reconnecting...')
        });

        //Disconnect event
        bot.discord.on('disconnect', () => {
            console.log('[discord] Disconnected!')
        });

        //Try Login
        try {
            bot.discord.login(bot.token);   
        } catch (error) {
            console.log('[discord] FAILED TO LOGIN!!!, Aborting startup!')
            process.exit(0);
        }
    },
    stop: async(bot) => {
        bot.discord.destroy();
    }
}