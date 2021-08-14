module.exports.command = {
    name: 'echo',
    description: 'repeats whatever you say',
    usage: ['echo'],
    execute: async (bot, message, args) => {
        message.channel.send(`${message.author}, ${args.join(' ')}`)
    }
}