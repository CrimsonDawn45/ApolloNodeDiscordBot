const DisTube = require('distube');

module.exports.service = {
    id: 'music',
    depends: ['discord'],
    start: async(bot) => {
        bot.music = new DisTube(bot.discord, { searchSongs: false, emitNewSongOnly: true})

        //TODO: Setup Music Bot Events

        //TODO: Make it actually detect when distube client is done loading!
        this.service.ready = true;
    },
    stop: async(bot) => {}
}