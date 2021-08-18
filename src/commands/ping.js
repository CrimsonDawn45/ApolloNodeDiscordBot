module.exports.command = {
    name: 'ping',
    description: 'a simple test command',
    usage: ['ping'],
    execute: async (bot, message, args) => {
        message.channel.send(`${message.author} Pong!`)
    }
}