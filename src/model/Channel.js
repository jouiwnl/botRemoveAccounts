import mongoose from '../database/index.js';

const ChannelSchema = new mongoose.Schema({
  channelId: String,
  guildId: String,
  name: String,
});

const Channel = mongoose.model('Channel', ChannelSchema);

export default Channel;