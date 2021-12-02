import Term from '../model/Term.js';

const checkMembersAutomatic = async (servidor) => {

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
};

export default checkMembersAutomatic;
