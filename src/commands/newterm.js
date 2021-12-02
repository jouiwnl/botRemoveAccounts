import Term from '../model/Term.js';

const newterm = async (message, args) => {

  const LIST_OF_ROLE_NAMES = ["ADM", "MOD", "MANAGE", "STREAMER", "OLD"];
    var isAuthorized = false;

  LIST_OF_ROLE_NAMES.map(roleName => {
      if (message.member.roles.highest.name.toLowerCase().startsWith(roleName.toLowerCase())) {
          isAuthorized = true;
      } else {
          isAuthorized = false;
      }
  });

  if (isAuthorized == true) {
    const palavra = await Term.findOne({ word: args });

    if (palavra) {        
      message.reply('Palavra já cadastrada');
    } else {
      const termo = new Term({
        guildId: message.guild.id,
        word: args
      });
      
      termo.save(err => {
        if(err) {
          message.reply('Ocorreu um erro ao salvar a palavra. Tente novamente!');
        } else {
          message.reply('Palavra salva no banco de dados');
        }
      });
    }
  } else {
    message.reply(`Você não tem cargo suficiente para executar esse comando!`);
  }

  
};

export default newterm;