const checkMembersByCommand = (message) => {

    const blackList = `(7'|7"|雷伊|Lunar Gostosa|Rayssinha Tesuda|Moreninhaaa Tesuda).*`;

    message.guild.members.cache.map(membro => {
        if (membro.user.username.startsWith('雷伊')) {
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
