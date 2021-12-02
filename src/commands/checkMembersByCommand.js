import Term from '../model/Term.js';

const checkMembersByCommand = async (message, servidor) => {

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
    } else {
        message.reply(`Você não tem cargo suficiente para executar esse comando!`);
    }

    
};

export default checkMembersByCommand;
