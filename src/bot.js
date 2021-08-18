const fs = require('fs')
const path = require('path')
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

/**
 * STARTUP SERVICES!!!
 */
let serviceDir = path.join(__dirname, './services')

console.log('Loading Services...')
console.log('----------------------------')

let services = fs.readdirSync(serviceDir);

services.forEach(service => {

    console.log(`Found service file: ${service}`)

    //Load a service
    let loadedService = undefined;

    try {
        loadedService = require('./services/' + service)
    } catch (error) {
        console.log(`\nFile \".\\services\\${service}\" is not a valid nodejs module!!!\n`)
        process.exit(0);
    }

    //Append to service list
    bot.services[loadedService.service.id] = loadedService.service

    //Log That service is loaded
    console.log('   loaded service: \"' + loadedService.service.id + '\"\n')
})

bot.services['discord'].start(bot)
bot.services['music'].start(bot)
bot.services['command'].start(bot)