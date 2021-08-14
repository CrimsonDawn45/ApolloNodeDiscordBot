module.exports.command = {
    name: 'repo',
    aliases: ['git'],
    description: 'returns discord bot\'s github repo',
    usage: ['repo'],
    execute: async (bot, message, args) => {
        message.channel.send(`${message.author}  https://github.com/CrimsonDawn45/ApolloSurvivalDiscordBot`)
    }
}