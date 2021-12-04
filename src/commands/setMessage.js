import Mensagem from '../model/Mensagem.js';

const setMessage = async (client, args) => {

  client.guilds.fetch().then(a => {
    a.map(guilda => {
      guilda.fetch().then(guild => {
        guild.channels.fetch().then(channels => {
          channels.map(channel => {
            if (channel == undefined) {
              return;
            }

            if (channel.type == 'GUILD_TEXT' && channel.name.match('início')) {
              channel.messages.fetch(args).then(async updateMessage => {
                console.log(updateMessage);
                await Mensagem.findOne({ guildId: updateMessage.guildId })
                  .updateOne({ mensagemId: updateMessage.id});
              });
            }
          });
        });
      });
    });

    console.log('All messages refreshed');
  });
};

export default setMessage;