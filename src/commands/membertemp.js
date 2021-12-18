import moment from 'moment';
import _ from 'lodash';
import sendDmAutomatic from '../controller/sendDmAutomatic.js';

const memberTemp = (message, guild) => {
  if (message && guild == null) {
    var contador = null;
    message.guild.members.fetch().then(a => {
      a.map(member => {
        var horaQueEntrou = moment(member.joinedTimestamp);
        var horaAtual = moment();
  
        if (horaAtual.subtract(5, 'minutes') >= horaQueEntrou) {
          if (_.isEmpty(member._roles)) {
            if (member.kickable) {
              sendDmAutomatic(member);
              setTimeout(() => {
                contador = contador + 1;
                member.kick('Você foi kickado do servidor! Cheque sua DM!');
              }, 1500);
            }
          }
        }
      });
    });

    return message.reply(`Um total de ${contador} membros foram kickados por não possuírem nenhum cargo.`);
  } 

  if (guild && message == null) {
    var contadorGuild = null;
    guild.members.fetch().then(a => {
      a.map(member => {
        var horaQueEntrou = moment(member.joinedTimestamp);
        var horaAtual = moment();
  
        if (horaAtual.subtract(5, 'minutes') >= horaQueEntrou) {
          if (_.isEmpty(member._roles)) {
            if (member.kickable) {
              sendDmAutomatic(member);
              setTimeout(() => {
                contadorGuild = contadorGuild + 1;
                member.kick('Você foi kickado do servidor! Cheque sua DM!');
              }, 1500);
            }
          }
        }
      });
    });

    guild.channels.fetch().then(a => {
      a.map(channel => {
        if(channel) {
          if (channel.name.toLowerCase().match('teste')) {
            if (!_.isNull(contadorGuild)) {
              channel.send(`Um total de ${contadorGuild} membros foram kickados por não possuírem nenhum cargo.`)
            }
          }
        }
      });
    });
  }
};

export default memberTemp;