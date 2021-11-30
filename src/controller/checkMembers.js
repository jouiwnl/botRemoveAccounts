const checkMembers = (message, args) => {

    const blackList = `(7"|7'|雷伊|Laura).*`;

    message.guild.members.cache.map(membro => {
        if (membro.user.username.match(blackList)) {
            
            membro.kick("Você foi banido do servidor")
            .catch(err => { 
                console.log(err);
            });
        }
    })
};

export default checkMembers;
