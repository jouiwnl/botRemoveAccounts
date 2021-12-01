import mongoose from '../database/index.js';

const TermSchema = new mongoose.Schema({
  guildId: String,
  word: String
});

const Term = mongoose.model('Term', TermSchema);

export default Term;