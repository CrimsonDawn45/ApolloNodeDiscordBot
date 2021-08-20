const path = require('path');
const fs = require('fs')

function loadServices(bot) {

    //Define Service Directory
    let serviceDir = path.join(__dirname, '../services')

    console.log('Loading Services...')
    console.log('----------------------------')

    let services = fs.readdirSync(serviceDir);

    services.forEach(service => {

        console.log(`Found service file: ${service}`)

        //Load a service
        let loadedService = undefined;

        try {
            loadedService = require('../services/' + service)

            //Append to service list
            bot.services[loadedService.service.id] = loadedService.service

            //Log That service is loaded
            console.log('   loaded service: \"' + loadedService.service.id + '\"\n')
        } catch (error) {
            
            console.log(`\nFile \".\\services\\${service}\" failed to be imported!, Skipping file!\n`) //Make it ignore bad files and keep going
        }
    })
}

module.exports = {
    loadServices: loadServices
}