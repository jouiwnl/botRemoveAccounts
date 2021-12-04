import mongoose from '../database/index.js';

const RoleSchema = new mongoose.Schema({
  roleId: String,
  guildId: String,
  name: String
});

const Role = mongoose.model('Role', RoleSchema);

export default Role;