import Term from '../model/Term.js';

const wordlist = async (message, args) => {
  var arrayTerms = [];
  const terms = await Term.find({ guildId: message.guild.id });

  if (args) {
    message.reply('Esse comando não necessita de argumentos adicionais');
  }

  if (terms) {
    terms.map((term, key) => {
      arrayTerms.push({
        name: `#${key + 1}`,
        value: term.word,
        inline: true,
      });
    });

    const embed = {
      color: 10181046,
      title: 'Lista de palavras',
      fields: arrayTerms
    };

    message.reply({ embeds: [embed] });

  } else {
    message.reply('Houve um erro ao acessar o banco!');
  }
};

export default wordlist;