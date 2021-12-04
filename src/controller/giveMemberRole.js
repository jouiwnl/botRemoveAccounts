import Mensagem from '../model/Mensagem.js';
import Role from '../model/Role.js';

const giveMemberRole = async (reaction, user) => {
  var mensagemReagida = await Mensagem.findOne({ mensagemId: reaction.message.id });
  if (mensagemReagida) {       
    var cargo = await Role.findOne({ guildId: reaction.message.guild.id });
    reaction.message.guild.roles.fetch(cargo.roleId).then(cargoAchado => {
      reaction.message.guild.members.fetch().then(membros => {
        membros.map(member => {
          if (reaction._emoji.name == '👍') {
            if (member.user.id == user.id) {
              member.roles.add(cargoAchado);
            }
          }
        });
      });
    });
  }
};

export default giveMemberRole;