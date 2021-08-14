module.exports.command = {
    name: 'stop',
    description: 'immediately stops any music being played',
    usage: ['stop'],
    execute: async (bot, message, args) => {
        bot.music.stop(message) 
        message.channel.send('Stopped music!');
    }
}