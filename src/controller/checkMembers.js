import Term from '../model/Term.js';

const checkMembers = async (membro) => {

    const terms = await Term.find({ guildId: membro.guild.id });
    
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
    })
};

export default checkMembers;
