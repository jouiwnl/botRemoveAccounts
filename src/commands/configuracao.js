import Role from '../model/Role.js';
import Channel from '../model/Channel.js';
import Mensagem from '../model/Mensagem.js';

const configuracao = async (message) => {
  const role = await Role.findOne({ guildId: message.guild.id });
  const channel = await Channel.findOne({ guildId: message.guild.id });

  const LIST_OF_ROLE_NAMES = ['ADM', 'DEV', 'MANAGE', 'STREAMER', 'MODS'];
  var isAuthorized = false;

  LIST_OF_ROLE_NAMES.map(roleName => {
    if (message.member.roles.highest.name.toLowerCase().startsWith(roleName.toString().toLowerCase())) {
      isAuthorized = true;
    }
  });

  if (isAuthorized) {

    if (role || channel) {
      return message.reply('Algumas das informações já foram criadas, por favor, exclua e tente novamente!');
    } else {
      const criaTudo = (message) => {
        message.guild.roles.create({
          name: 'Membro',
        }).then(cargo => {
          new Role({
            roleId: cargo.id,
            guildId: cargo.guild.id,
            name: cargo.name
          }).save(err => {
            if (err) {
              console.log('Ocorreu um erro ao criar o cargo!');
            } else {
              message.reply('Cargo criado com sucesso!');
            }
          });
        });
  
        message.guild.channels.create(
          'Início', 
          { type: 'GUILD_TEXT' }
        ).then((channel) => {
          new Channel({ 
            guildId: channel.guildId,
            channelId: channel.id,
            name: channel.name
          }).save(err => {
            if (err) {
              console.log('Ocorreu um erro ao criar o canal!');
            } else {
              message.reply('Canal criado com sucesso!');
            }
          });
  
          const embed = {
            color: 10181046,
            title: 'Bem-vindo(a) ao servidor!',
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
      
          channel.send({ embeds: [embed] }).then(reactMessage => {
            new Mensagem({
              channelId: reactMessage.channelId,
              guildId: reactMessage.guildId,
              mensagemId: reactMessage.id
            }).save();
          });
        });
      };
  
      criaTudo(message);
  
      return message.reply('Configuração realizada com sucesso!');
    }
  } else {
    message.reply('Você não tem cargo suficiente para executar esse comando!');
  }
};

export default configuracao;