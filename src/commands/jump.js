module.exports.command = {
    name: 'jump',
    description: 'jumps to a song in the queue',
    usage: ['jump <song number>'],
    execute: async (bot, message, args) => {

        if(!message.member.voice.channel) return message.channel.send('**You must be in a voice channel to use that.**')

        let queue = await bot.music.getQueue(message);

        if(queue) {

            if(!isNaN(args[0])) {

                bot.music.jump(message, args[0]) 

            } else {

                message.channel.send(`\`${args[0]}\`** is not a number.**`)
            }

        } else if(!queue) {
            message.channel.send('**There is nothing playing.**')
        }
    }
}