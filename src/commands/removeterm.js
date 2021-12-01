import Term from '../model/Term.js';

const removeterm = async (message, args) => {
    if (message && args) {        
        const termo = await Term.findOne({ word: args, guildId: message.guild.id });
        if (termo) {
            termo.delete(err => {
                if (err) {
                    message.reply('Houve um erro ao retirar a palavra. Tente novamente!');
                } else {
                    message.reply('Palavra retirada da base de dados!');
                }
            })
        } else {
            message.reply(`O termo digitado não está cadastrado!`);
        }
    }
};

export default removeterm;