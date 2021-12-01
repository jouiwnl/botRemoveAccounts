import Term from '../model/Term.js';

const newterm = async (message, args) => {
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
};

export default newterm;