import moment from 'moment';
import _ from 'lodash';

const memberTemp = (message) => {

  var cont = 0;

  message.guild.members.fetch().then(a => {
    a.map(member => {
      var horaQueEntrou = moment(member.joinedTimestamp);
      var horaAtual = moment();

      if (horaAtual.subtract(5, 'minutes') >= horaQueEntrou) {
        if (_.isEmpty(member._roles)) {
          cont += 1;
        }
      }
    });
    return message.reply(`Um total de ${cont} membros que participam do servidor a mais de 5 minutos, estão sem cargos no momento.`);
  });

    
};

export default memberTemp;