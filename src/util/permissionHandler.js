const {Datastore} = require('@yetzt/nedb')

class PermissionHandler {

    bot;
    permDb;

    constructor(bot, commands) {
        this.bot = bot;
        this.permDb = new Datastore({ filename: '../../db/permissions.db', autoload: true})
    }

    registerGuild(guild) {
        let guild = {
            id: guild.id,
            roles: guild.roles.fetch()
        }
    }

    deRegisterGuild(guild) {

    }

    registerRole(role) {
        let role = {
            id: role.id,
            permissions: []
        }
    }
    
    deRegisterRole(role) {

    }

    isAdmin(guildMember) {
        guildMember.permissions
    }
}

module.exports = {
    PermissionHandler: PermissionHandler
}