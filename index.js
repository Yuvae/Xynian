const { CommandoClient } = require('discord.js-commando');
const path = require('path');

const client = new CommandoClient({
    commandPrefix: '-',
    owner: '252103401196879873',
    Invite: 'https://discord.gg/fnhuqx3gM7'
})

client.registry
    .registerDefaultTypes()
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerGroup('music', 'join')
    .registerCommandsIn(path.join(__dirname, 'commands'));


    client.once('ready', () => {
        console.log(`connecté en tant que ${client.user.tag} - (${client.user.id})`);
    })

    client.on('error', (error) => console.error(error));

    client.login(process.env.TOKEN);