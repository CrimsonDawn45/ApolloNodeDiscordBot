module.exports.command = {
    name: 'skip',
    description: 'skips current song',
    usage: ['skip'],
    execute: async (bot, message, args) => {

        if(!message.member.voice.channel) return message.channel.send('**You must be in a voice channel to use that.**')

        let queue = await bot.music.getQueue(message);

        if(queue) {
            bot.music.skip(message);
            message.channel.send(`**Skipped song **\`${queue.songs[0].name}\`**.**`)

        } else if(!queue) {
            message.channel.send('**There is nothing playing.**')
        }
    }
}