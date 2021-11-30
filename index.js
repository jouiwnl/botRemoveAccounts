import Discord from 'discord.js';
import openServer from './src/server/server.js';
import config from './configs/configs.js';

const token = config.BOT_TOKEN1 + config.BOT_TOKEN2;

const intents = new Discord.Intents(32767);
const client = new Discord.Client({ intents });

client.login(token);
openServer();