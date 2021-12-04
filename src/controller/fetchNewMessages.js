

const fetchNewMessages = async (cliente) => {
  cliente.guilds.fetch().then(a => {
    a.map(guilda => {
      guilda.fetch().then(guild => {
        guild.channels.fetch().then(channels => {
          channels.map(channel => {
            if (channel == undefined) {
              return;
            }

            if (channel.type == 'GUILD_TEXT' && channel.name.match('início')) {
              channel.messages.fetch().then(() => {});
            }
          });
        });
      });
    });

    console.log('All messages refreshed');
  });
};

export default fetchNewMessages;