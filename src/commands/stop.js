module.exports.command = {
    name: 'stop',
    description: 'immediately stops any music being played',
    permissions: ['dj'],
    usage: ['stop'],
    execute: async (bot, message, args) => {

        if(!message.member.voice.channel) return message.channel.send('**You must be in a voice channel to use that.**')

        let queue = await bot.music.getQueue(message);

        if(queue) {
            bot.music.stop(message);
            message.channel.send('**Stopped all music.**')
        } else if(!queue) {
            message.channel.send('**There is nothing playing.**')
        }
    }
}