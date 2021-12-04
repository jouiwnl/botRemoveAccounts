import mongoose from '../database/index.js';

const MensagemSchema = new mongoose.Schema({
  channelId: String,
  guildId: String,
  mensagemId: String
});

const Mensagem = mongoose.model('Mensagem', MensagemSchema);

export default Mensagem;