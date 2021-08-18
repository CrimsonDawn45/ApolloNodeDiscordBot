module.exports.command = {
    name: 'resume',
    description: 'resumes current song',
    usage: ['resume'],
    execute: async (bot, message, args) => {

        if(!message.member.voice.channel) return message.channel.send('**You must be in a voice channel to use that.**')

        let queue = await bot.music.getQueue(message);

        if(queue) {

            if(queue.pause) {
                bot.music.resume(message)
                message.channel.send(`**Resumed song, **\`${queue.songs[0].name}\`** from ** \`${queue.formattedCurrentTime}\`**.**`)
            } else {
                message.channel.send('**Stream is not paused.**')
            }

        } else if(!queue) {
            message.channel.send('**There is nothing playing.**')
        }
    }
}