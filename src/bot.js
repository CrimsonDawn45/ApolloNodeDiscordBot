const init = require('./util/init')
require('dotenv').config();

/**
 * Create Main Object
 */
var bot = {
    token: process.env.DISCORD_BOT_TOKEN,
    prefix: process.env.DISCORD_BOT_PREFIX,
    services: []
};
console.log('Grabbed Environment vars!\n')

//Load Services
init.loadServices(bot);

/**
 * TODO: make this less dumb by writing something to actually automatically figure out the load order.
 * 
 * possibly use a BFS algorithm for topographical sorting since dependency tree will be a DAG
 * 
 * ex. Khans Algorithm
 */
bot.services['discord'].start(bot)
bot.services['music'].start(bot)
bot.services['command'].start(bot)