const modLog = require('../../tools/dbTools').modLog;
const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;
const moment = require('moment');
const stripIndents = require('common-tags').stripIndents;
const waitSync = require('wait-sync');
module.exports = class ban extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'ban',
            aliases: [],
            group: 'moderation',
            memberName: 'ban',
            description: 'ban someone',
            details: oneLine `
             Bans a user from your server. Unless they're jatsu. 
            `,
            examples: ['jim ban @user'],

            args: [{
                    key: 'member',
                    prompt: 'Who gone get banned?',
                    type: 'member',
                    infinite: false
                },
                {
                    key: 'reason',
                    label: 'reason',
                    prompt: 'Why are you banning this user?',
                    type: 'string',
                    infinite: false
                }

            ]
        });
    }

    async run(msg, args) {
        let member = args.member;
        let reason = args.reason;
        const embed = {
            "title": "**Banned by**",
            "description": msg.author.username,
            "color": 16714250,
            "timestamp": moment().format('MMMM Do YYYY, h:mm:ss a'),
            "footer": {
                "icon_url": msg.client.user.avatarURL,
                "text": "Jimbot"
            },
            "author": {
                "name": member.user.username,
                "icon_url": member.user.avatarURL,
            },
            "fields": [{
                "name": "Reason",
                "value": reason
            }]
        };
        if (!msg.guild.members.get(msg.client.user.id).hasPermission('BAN_MEMBERS')) return msg.channel.send('I do not have permission to ban members.');
        if (args.member.id == msg.author.id) {
            return msg.channel.send('You can\'t ban yourself, are you nuts!');
        }
        if (msg.guild.members.get(msg.author.id).highestRole.calculatedPosition > args.member.highestRole.calculatedPosition) {
            return msg.channel.send('This member is higher than you.');
        }
        if (args.member.id == '147508587382439937') {
            msg.channel.send('Banning user: Jatsu.');
            waitSync(3);
            msg.channel.send('What\'s this!?');
            waitSync(3);
            msg.channel.send('I can\'t seem to ban him.');
            waitSync(3);
            msg.channel.send('\`ERROR\`');
        } else {
            const guildMember = msg.guild.members.get(member.user.id);
            if (msg.guild.members.get(msg.author.id).hasPermission('BAN_MEMBERS')) {
                modLog(msg, { embed: embed });
                guildMember.ban(`Banned by: ${msg.author.username} \n Reason: ${reason}`);
            } else {
                msg.channel.send("You're not allowed to do this...");
            }

        }
    }
};