const sendDmAutomatic = (member) => {

  const embed = {
    color: 10181046,
    title: 'Bem-vindo ao servidor!',
    url: 'https://twitch.tv/calango',
    author: {
      name: 'Ban bot',
      icon_url: 'https://i.imgur.com/ow52wsH.jpg',
    },
    description: `Devido ao alto crescimento de self-bots no discord, o funcionamento do servidor foi levemente alterado!
        
                    Logo que entrar, adquira um cargo no canal #cargos em no máximo 5 minutos, caso não consiga a tempo você será kickado.
                    
                    Lembrando, tudo isso é pelo bem do servidor, para mantê-lo organizado e sem fantasmas com nenhuma interação.`,
    image: {
      url: 'https://static-cdn.jtvnw.net/jtv_user_pictures/b572fe0a-3fab-4a0c-bc7e-c10ff637fdb5-profile_image-300x300.png'
    }
  };

  member.send({ embeds: [embed] });
};

export default sendDmAutomatic;