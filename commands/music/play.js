const { VoiceConnection } = require('discord.js');
const { Command, CommandoMessage } = require("discord.js-commando");
const ytdl = require('ytdl-core-discord');

module.exports = class PlayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'play',
            aliases: ['p'],
            group: 'music',
            memberName: 'play',
            description: 'Lit une musique depuis Youtube.',
            args: [
                {
                    key: 'query',
                    prompt: 'Quel musique veux tu lire ?',
                    type: 'string'
                }
            ]
        });
    }

    /**
     * 
     * @param {CommandoMessage} message 
     * @param {String} query
     */
    async run(message, { query }) {
        await message.member.voice.channel.join().then((connection) => {
            this.runVideo(message, connection, query);
        });
    }

        /**
         * 
         * @param {CommandoMessage} message 
         * @param {VoiceConnection} connection 
         * @param {*} video 
         */
    async runVideo(message, connection, video) {
        const dispatcher = connection.play( await ytdl(video, {filtrer: 'audioonly' }), { type: 'opus'} );
        
        dispatcher.on('finish', () => {
            message.member.voice.channel.leave();
        });
    }
}