import Discord, { Interaction } from 'discord.js';
import openServer from './src/server/server.js';
import config from './configs/configs.js';
import checkMembers from './src/controller/checkMembers.js';
import checkMessageAuthor from './src/utils/checkMessageAuthor.js';
import { getArgs, getCommand } from './src/utils/checkCommand.js';

const token = config.BOT_TOKEN1 + config.BOT_TOKEN2;

const intents = new Discord.Intents(32767);
const client = new Discord.Client({ intents });

//BOT COMMANDS
client.on('messageCreate', (message) => {
    checkMessageAuthor(message);

    if(getCommand(message) == 'check') {
        checkMembers(message, getArgs(message));
    }
})


client.login(token);
openServer();