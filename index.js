//IMPORTS BIBLIOTECAS ESSENCIAIS
import Discord from 'discord.js';
import { CronJob } from 'cron';
import config from './configs/configs.js';
import express from 'express';
const server = express();
// ---------------------------------------

//IMPORTS COMANDOS QUE SE CHAMAM SOZINHOS DEVIDO A EVENTOS
import checkMembersAutomatic from './src/controller/checkMembersAutomatic.js';
import checkMembers from './src/controller/checkMembers.js';
import sendDmAutomatic from './src/controller/sendDmAutomatic.js';
import fetchNewMessages from './src/controller/fetchNewMessages.js';
// ---------------------------------------

//IMPORTS UTILITARIOS
import { getArgs, getCommand } from './src/utils/checkCommand.js';
// ---------------------------------------

//IMPORTS DE COMANDOS
import setMessage from './src/commands/setMessage.js';
import checkMembersByCommand from './src/commands/checkMembersByCommand.js';
import configuracao from './src/commands/configuracao.js';
import giveMemberRole from './src/controller/giveMemberRole.js';
import removeMemberRole from './src/controller/removeMemberRole.js';
import newterm from './src/commands/newterm.js';
import removeterm from './src/commands/removeterm.js';
import wordlist from './src/commands/wordlist.js';
import memberTemp from './src/commands/membertemp.js';
import setCargo from './src/commands/setCargo.js';
// ---------------------------------------

//IMPORT MODELS DE TABELA NO BANCO
import Role from './src/model/Role.js';
import Channel from './src/model/Channel.js';
import Mensagem from './src/model/Mensagem.js';
// ---------------------------------------

//DEFINE TOKEN PRESENTE EM ARQUIVOS DE CONFIGURACAO
const token = config.BOT_TOKEN1 + config.BOT_TOKEN2;
const intents = new Discord.Intents(32767);
const client = new Discord.Client({ intents });

server.all('/', (req, res) => {
  res.send('Bot is running');
});  
  
const openServer = () => {
  server.listen(process.env.PORT || 3333, () => {
    console.log('Server is running');
  });
};
// ---------------------------------------

//EVENTOS DE REA????O DE MENSAGEM
client.on('messageReactionAdd', async (reaction, user) => {
  giveMemberRole(reaction, user);
});

client.on('messageReactionRemove', async (reaction, user) => {
  removeMemberRole(reaction, user);
});
// ----------------------------------

//EVENTOS QUANDO O BOT ACORDAR
client.on('ready', (cliente) => {
  const job = new CronJob('00 */20 * * * *', () => {
    cliente.guilds.fetch().then(todasGuilds => {
      todasGuilds.map(preGuild => {
        preGuild.fetch().then(guild => {
          if (guild.name.toLowerCase().match('calango')) {
            memberTemp(null, guild);
          }
          checkMembersAutomatic(guild);    
        });
      });
    });
  }, null, true, 'America/Sao_Paulo');

  job.start();

  fetchNewMessages(cliente);
});
// ----------------------------------

//EVENTO QUANDO UM MEMBRO ENTRAR NO SERVIDOR
client.on('guildMemberAdd', (member) => {
  checkMembers(member);
});
// ----------------------------------

//EVENTOS QUANDO HOUVER MUDAN??AS EM UM CARGO
client.on('roleDelete', async (role) => {
  const oldRole = Role.findOne({ 
    guildId: role.guild.id
  });

  await oldRole.deleteOne();
});
// ----------------------------------

//EVENTOS QUANDO HOUVER MUDAN??AS EM CANAIS
client.on('channelDelete', async (channel) => {
  const canal = Channel.findOne({ 
    guildId: channel.guildId
  });

  const mensagemDoCanal = Mensagem.findOne({ 
    channelId: channel.id
  });
  
  await canal.deleteOne();
  await mensagemDoCanal.deleteOne();
});
// ----------------------------------


//COMANDOS GERAIS DO BOT
client.on('messageCreate', (message) => {
  //Refaz cache de mensagens dos canais
  fetchNewMessages(client);
  // ---------------------------------------

  //COMANDOS GERAIS DO BOT
  if(getCommand(message) == 'check') {
    checkMembersByCommand(message, message.guild);

  } if(getCommand(message) == 'newterm') {
    newterm(message, getArgs(message));

  } if(getCommand(message) == 'removeterm') {
    removeterm(message, getArgs(message));

  } if(getCommand(message) == 'wordlist') {
    wordlist(message, getArgs(message));

  } if(getCommand(message) == 'kick') {
    memberTemp(message, null);

  } if(getCommand(message) == 'testmessage') {
    sendDmAutomatic(message.member);

  } if(getCommand(message) == 'config') {
    configuracao(message);

  } if(getCommand(message) == 'setcargo') {
    setCargo(message, getArgs(message));

  } if(getCommand(message) == 'setmessage') {
    setMessage(client, getArgs(message));
  }
  // ---------------------------------------
});

// ----------------------------------
client.login(token);
openServer();