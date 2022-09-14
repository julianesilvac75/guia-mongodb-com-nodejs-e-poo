import 'dotenv/config';
import mongoose from 'mongoose';

const connectToDatabase = (
  mongoDatabaseURI = process.env.MONGO_URI
    // eslint-disable-next-line max-len
    || 'mongodb://127.0.0.1:27017/glassesStore?readPreference=primary&directConnection=true&ssl=false',
) => mongoose.connect(mongoDatabaseURI);

export default connectToDatabase;