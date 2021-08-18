module.exports.command = {
    name: 'queue',
    description: 'shows current queue',
    usage: ['queue'],
    execute: async (bot, message, args) => {

        let queue = await bot.music.getQueue(message);

        if(queue) {
            
            let songList = '**Song Queue:**\n```'
            let songs = queue.songs

            for(let i = 1; i < songs.length; i++) {
                songList = songList + `\n${i}) ${songs[i].name} - ${songs[i].formattedDuration}`
            }

            songList = songList + `\`\`\`**Currently Playing: **\`${songs[0].name}\``

            message.channel.send(songList);

        } else if(!queue) {
            message.channel.send('**There is nothing playing.**')
        }
    }
}