import blackList from "../utils/blackList.js";
const checkMembersByCommand = (servidor) => {

    servidor.members.fetch().then(membros => {
        membros.map(membro => {
            if (membro.user.username != undefined) {
                if (membro.user.username.match(blackList.list)) {
                    membro.ban({ reason: "Você foi banido do servidor" })
                    .then(res => {
                        console.log(res);
                    })
                    .catch(err => { 
                        console.log(err);
                    });  
                }
            }
        })
    })
};

export default checkMembersByCommand;
