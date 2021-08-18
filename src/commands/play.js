module.exports.command = {
    name: 'play',
    description: 'plays music',
    usage: ['play <song name>','play <url>'],
    execute: async (bot, message, args) => {

        if(!message.member.voice.channel) return message.channel.send('**You must be in a voice channel to use that.**')

        let song = args.join(' ').trim();

        if(args != undefined) {
            bot.music.play(message, song)
        } else {
            message.channel.send('Song name cannot be empty!')
        }
    }
}