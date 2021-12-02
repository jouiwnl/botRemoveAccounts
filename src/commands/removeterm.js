import Term from '../model/Term.js';

const removeterm = async (message, args) => {

    const LIST_OF_ROLE_NAMES = ["ADM", "MOD", "MANAGE", "STREAMER", "OLD"];
    var isAuthorized = false;

    LIST_OF_ROLE_NAMES.map(roleName => {
        if (message.member.roles.highest.name.toLowerCase().match(roleName.toLowerCase())) {
            isAuthorized = true;
        } else {
            isAuthorized = false;
        }
    });

    if (isAuthorized == true) {
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
    } else {
        message.reply(`Você não tem cargo suficiente para executar esse comando!`);
    }
};

export default removeterm;