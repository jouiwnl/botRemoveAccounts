const sendDmAutomatic = (member) => {

  const embed = {
    color: 10181046,
    title: 'Você foi kickado do servidor!',
    url: 'https://twitch.tv/calango',
    author: {
      name: 'Ban bot',
      icon_url: 'https://static-cdn.jtvnw.net/jtv_user_pictures/b572fe0a-3fab-4a0c-bc7e-c10ff637fdb5-profile_image-300x300.png',
    },
    description: `Devido ao alto crescimento de self-bots no discord, o funcionamento do servidor foi levemente alterado!
        
                    Todos os usuários que desejam ser ativos no servidor, devem reagir à mensagem presente no canal #boas-vindas em até 5 minutos, caso contrário, você será kickado novamente.
                    
                    Lembrando, tudo isso é pelo bem do servidor, para mantê-lo organizado e sem fantasmas com nenhuma interação.`,
    image: {
      url: 'https://static-cdn.jtvnw.net/jtv_user_pictures/b572fe0a-3fab-4a0c-bc7e-c10ff637fdb5-profile_image-300x300.png'
    }
  };

  member.send({ embeds: [embed] }).then(res => {
    console.log(res)
  }).catch(err => {
    console.log("Não foi possível enviar a mensagem")
  });

  member.send(`https://discord.gg/calango`).then(res => {
    console.log(res)
  }).catch(err => {
    console.log("Não foi possível enviar o convite do servidor")
  });
};

export default sendDmAutomatic;