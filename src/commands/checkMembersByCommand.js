import blackList from "../utils/blackList.js";
const checkMembersByCommand = (message) => {

    message.guild.members.cache.map(membro => {
        if (membro.user.username.match(blackList.list)) {
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

export default checkMembersByCommand;
