import Discord from 'discord.js';
import openServer from './src/server/server.js';
import config from './configs/configs.js';
import checkMembersAutomatic from './src/controller/checkMembersAutomatic.js';
import checkMembers from './src/controller/checkMembers.js';
import checkMembersByCommand from './src/commands/checkMembersByCommand.js';
import checkMessageAuthor from './src/utils/checkMessageAuthor.js';
import newterm from './src/commands/newterm.js';
import sendDmAutomatic from './src/controller/sendDmAutomatic.js';
import removeterm from './src/commands/removeterm.js';
import wordlist from './src/commands/wordlist.js';
import { getArgs, getCommand } from './src/utils/checkCommand.js';
import { CronJob } from 'cron';

import memberTemp from './src/commands/membertemp.js';

const token = config.BOT_TOKEN1 + config.BOT_TOKEN2;

const intents = new Discord.Intents(32767);
const client = new Discord.Client({ intents });

client.on('guildMemberAdd', (member) => {
    checkMembers(member);
   // sendDmAutomatic(member);
})

//BOT COMMANDS
client.on('messageCreate', (message) => {
    
    const job = new CronJob('00 */3 * * * *', () => {
        checkMembersAutomatic(message.guild);
        console.log('passou aqui');
    }, null, true, 'America/Sao_Paulo');

    job.start();

    checkMessageAuthor(message);

    if(getCommand(message) == 'check') {
        checkMembersByCommand(message, message.guild);
    } if(getCommand(message) == 'newterm') {
        newterm(message, getArgs(message));
    } if(getCommand(message) == 'removeterm') {
        removeterm(message, getArgs(message));
    } if(getCommand(message) == 'wordlist') {
        wordlist(message, getArgs(message));
    } if(getCommand(message) == 'test') {
        memberTemp(message);
    } if(getCommand(message) == 'testmessage') {
        sendDmAutomatic(message.member);
    } 
})


client.login(token);
openServer();