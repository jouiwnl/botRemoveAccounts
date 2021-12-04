import Role from '../model/Role.js';

const setCargo = async (message, args) => {
  message.guild.roles.fetch(args).then(async role => {
    await Role.findOne({ guildId: message.guild.id })
      .updateOne({ name: role.name,  roleId: role.id});
  });
};

export default setCargo;