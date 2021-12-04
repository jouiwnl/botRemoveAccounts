import Term from '../model/Term.js';
import _ from 'lodash';

const checkMembersAutomatic = async (servidor) => {

  if (_.isNull(servidor)) {
    return;
  }

  const terms = await Term.find({ guildId: servidor.id });

  servidor.members.fetch().then(membros => {
    membros.map(membro => {
      if (membro.user.username != undefined) {
        terms.map(word => {
          if (membro.user.username.split(' ').join('').toLowerCase().match(word.word.toLowerCase())) {
            membro.ban({ reason: 'Você foi banido do servidor' })
              .then(res => {
                console.log(res);
              })
              .catch(err => { 
                console.log(err);
              }); 
          }
        });
      }
    });
  });
};

export default checkMembersAutomatic;
