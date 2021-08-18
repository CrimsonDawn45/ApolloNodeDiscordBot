module.exports.command = {
    name: 'pause',
    description: 'pauses current song',
    usage: ['pause'],
    execute: async (bot, message, args) => {

        if(!message.member.voice.channel) return message.channel.send('**You must be in a voice channel to use that.**')

        let queue = await bot.music.getQueue(message);

        if(queue) {

            if(!queue.pause) {
                bot.music.pause(message)
                message.channel.send(`**Paused song, **\`${queue.songs[0].name}\`** at ** \`${queue.formattedCurrentTime}\`**.**`)
            } else {
                message.channel.send('**Stream is already paused.**')
            }            

        } else if(!queue) {
            message.channel.send('**There is nothing playing.**')
        }
    }
}