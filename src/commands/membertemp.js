import moment from 'moment';
import _ from 'lodash';
import sendDmAutomatic from '../controller/sendDmAutomatic.js';
import { DiscordAPIError } from 'discord.js';

const memberTemp = (message, guild) => {
  var contadorGuild = 0;
  var contador = 0;
  if (message && guild == null) {
    message.guild.members.fetch().then(a => {
      a.map(member => {
        var horaQueEntrou = moment(member.joinedTimestamp);
        var horaAtual = moment();
  
        if (horaAtual.subtract(5, 'minutes') >= horaQueEntrou) {
          if (_.isEmpty(member._roles)) {
            contador = contador + 1;
            if (member.kickable) {
              sendDmAutomatic(member);
              setTimeout(() => {
                member.kick('Kickado por não possuir cargo!')
              }, 1500);
            }
          }
        }
      });
    });
    return message.reply(`Um total de ${contador} membros foram kickados por não possuírem nenhum cargo.`);
  } 

  if (guild && message == null) {
    guild.members.fetch().then(a => {
      a.map(member => {
        var horaQueEntrou = moment(member.joinedTimestamp);
        var horaAtual = moment();
  
        if (horaAtual.subtract(5, 'minutes') >= horaQueEntrou) {
          if (_.isEmpty(member._roles)) {
            contadorGuild = contadorGuild + 1;
            if (member.kickable) {
              sendDmAutomatic(member);
              setTimeout(() => {
                member.kick('Kickado por não possuir cargo!') 
              }, 1500);
            }
          }
        }
      });
    }).then(() => {
      console.log(contadorGuild);
      guild.channels.fetch().then(a => {
        a.map(channel => {
          if(channel) {
            if (channel.name.toLowerCase().match('teste')) {
              if (contadorGuild > 0) {
                channel.send(`Um total de ${contadorGuild} membros foram kickados por não possuírem nenhum cargo.`)
              }
            }
          }
        });
      });
    });
  }
};

export default memberTemp;