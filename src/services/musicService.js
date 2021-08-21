const DisTube = require('distube');

module.exports.service = {
    id: 'music',
    depends: ['discord'],
    start: async(bot) => {
        bot.music = new DisTube(bot.discord, { searchSongs: false, emitNewSongOnly: true})

        //Playing Song Event
        bot.music.on('playSong', (message, queue, song) => message.channel.send(
            `**Now Playing** \`${song.name}\`** - **\`${song.formattedDuration}\`, Requested by: ${song.user}.`
        ));

        //Add Song to Queue event
        bot.music.on('addSong', (message, queue, song) => {
            if(song.user.bot == false) {
                `**Added to Queue** \`${song.name}\`** - **\`${song.formattedDuration}\`, Queued by: ${song.user}.`
            } else {
                `**Autoplaying Song \"${song.name}\"** - **\'${song.formattedDuration}\'.`
            }
        });

        //Autoplay no next song event
        bot.music.on('noRelated', (message) => {
            message.channel.send('**Couldn\'t find another related song, Stopping music.**')
            bot.music.stop(message)
        });

        this.service.ready = true;
    },
    stop: async(bot) => {
        bot.music.destroy();
    }
}