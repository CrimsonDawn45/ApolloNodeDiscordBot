const nedb = require('@yetzt/nedb')

class PermissionHandler {

    bot;
    permSet;

    constructor(bot, commands) {
        this.bot = bot;
        this.permSet = new Set();

        commands.forEach(command => {

            if(command.permissions != undefined) {

                command.permissions.forEach(permission => {
                    this.permSet.add(permission);
                })
            }
        })
    }

    isAdmin(guildMember) {

    }
}

module.exports = {
    PermissionHandler: PermissionHandler
}