module.exports.command = {
    name: 'play',
    description: 'plays music',
    usage: ['play <song name>','play <url>'],
    execute: async (bot, message, args) => {

        let channel = message.channel;
        let song = args.join(' ');

        if(args != undefined) {
            music.play(message, song)
        } else {
            channel.send('Song name cannot be empty!')
        }
    }
}