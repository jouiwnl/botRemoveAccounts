import moment from 'moment';
import _ from 'lodash';
import sendDmAutomatic from '../controller/sendDmAutomatic.js';

const memberTemp = (message) => {
  var contador = 0;

  message.guild.members.fetch().then(a => {
    a.map(member => {
      var horaQueEntrou = moment(member.joinedTimestamp);
      var horaAtual = moment();

      if (horaAtual.subtract(5, 'minutes') >= horaQueEntrou) {
        if (_.isEmpty(member._roles)) {
          if (member.kickable) {
            contador = contador + 1;
            console.log(member.user.username);
            member.kick('Você foi kickado do servidor! Cheque sua DM!');
            sendDmAutomatic(member);
          }
        }
      }
    });

    return message.reply(`Um total de ${contador} membros foram kickados por não possuírem nenhum cargo.`);
  });

    
};

export default memberTemp;