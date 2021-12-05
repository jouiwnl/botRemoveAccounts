//IMPORTS BIBLIOTECAS ESSENCIAIS
import Discord from 'discord.js';
import openServer from './src/server/server.js';
import { CronJob } from 'cron';
import config from './configs/configs.js';
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
import checkMessageAuthor from './src/utils/checkMessageAuthor.js';
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
// ---------------------------------------

//EVENTOS DE REAÇÃO DE MENSAGEM
client.on('messageReactionAdd', async (reaction, user) => {
  giveMemberRole(reaction, user);
});

client.on('messageReactionRemove', async (reaction, user) => {
  removeMemberRole(reaction, user);
});
// ----------------------------------

//EVENTOS QUANDO O BOT ACORDAR
client.on('ready', (cliente) => {
  const job = new CronJob('00 */3 * * * *', () => {
    cliente.guilds.fetch().then(todasGuilds => {
      todasGuilds.map(preGuild => {
        preGuild.fetch().then(guild => {
          checkMembersAutomatic(guild);    
        });
      });
    });
    console.log('passou');
  }, null, true, 'America/Sao_Paulo');

  job.start();

  fetchNewMessages(cliente);
});
// ----------------------------------

//EVENTO QUANDO UM MEMBRO ENTRAR NO SERVIDOR
client.on('guildMemberAdd', (member) => {
  checkMembers(member);
  // sendDmAutomatic(member);
});
// ----------------------------------

//EVENTOS QUANDO HOUVER MUDANÇAS EM UM CARGO
client.on('roleDelete', async (role) => {
  const oldRole = Role.findOne({ 
    guildId: role.guild.id
  });

  await oldRole.deleteOne();
});
// ----------------------------------

//EVENTOS QUANDO HOUVER MUDANÇAS EM CANAIS
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

  //checa autor da mensagem, pra evitar comandos por bot
  checkMessageAuthor(message);
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

  } if(getCommand(message) == 'test') {
    memberTemp(message);

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