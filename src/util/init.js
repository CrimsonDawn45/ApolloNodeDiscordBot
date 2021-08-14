

module.exports = {
    LoadServices: (bot) => {

        
    },

    StartServices: (bot) => {
        //Start
        console.log('Starting Services...')
        console.log('----------------------------')

        let finished = false;

        while(!finished) {  //Keep Looping until all services are running.

            bot.services.forEach(service => {   //Try to start a service

                let dependsLoaded = true;

                service.service.depends.forEach(depend => { //Check each depend

                    if(bot.services[depend].service.ready == undefined) {
                        dependsLoaded = false;
                    }
                });

                if(dependsLoaded) {
                    service.service.start(bot);
                    console.log(`started service ${service.service.id}`)
                }
            });

            //finished = true; //Set finished

            //If a service isn't ready set finished to false.
            bot.services.forEach(service => {
                if(service.service.ready == undefined) {
                    finished = false;
                }
            })
        }
    }
}