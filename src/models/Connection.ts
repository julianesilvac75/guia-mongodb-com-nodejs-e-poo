import 'dotenv/config';
import mongoose from 'mongoose';

// eslint-disable-next-line max-len
const connect = 'mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb';

const connectToDatabase = (
  mongoDatabaseURI = process.env.MONGO_URI
    || connect,
) => mongoose.connect(mongoDatabaseURI);

export default connectToDatabase;