import Term from '../model/Term.js';

const checkMembersByCommand = (message, servidor) => {

    const LIST_OF_ROLE_NAMES = ["ADM", "MOD", "MANAGE", "STREAMER"];
    var isAuthorized = false;

    if (!isAuthorized) {
        LIST_OF_ROLE_NAMES.map(roleName => {
            message.member.roles.cache.map(cargoDoMembro => {
                if (cargoDoMembro.name.toLowerCase().match(roleName.toLowerCase())) {
                    isAuthorized = true;
                } else {
                    isAuthorized = false;
                }
            });
        });

        message.reply(`Você não tem cargo suficiente para executar esse comando!`);
    }  else if (isAuthorized) {

        const terms = await Term.find({ guildId: servidor.id });

        servidor.members.fetch().then(membros => {
            membros.map(membro => {
                if (membro.user.username != undefined) {
                    terms.map(word => {
                        if (membro.user.username.toLowerCase().match(word.word.toLowerCase())) {
                            membro.ban({ reason: "Você foi banido do servidor" })
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

        message.reply(`Comando executado com sucesso!`);
    }
};

export default checkMembersByCommand;
