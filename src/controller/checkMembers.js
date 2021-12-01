const checkMembers = (membro) => {

    const blackList = `(雷伊|Lunar Gostosa|Rayssinha Tesuda|Moreninhaaa Tesuda).*`;

    if (membro.user.username.startsWith('雷伊')) {
        membro.ban({ reason: "Você foi banido do servidor" })
        .then(res => {
            console.log(res);
        })
        .catch(err => { 
            console.log(err);
        });  
    }
};

export default checkMembers;
