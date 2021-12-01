import mongoose from 'mongoose';
import configs from '../../configs/configs.js';

const url = configs.MONGO_URL;

try {
  // Connect to the MongoDB cluster
  mongoose.connect(
    url,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log(' Mongoose is connected'),
  );
} catch (e) {
  console.log('could not connect');
}

mongoose.Promise = global.Promise;

export default mongoose;