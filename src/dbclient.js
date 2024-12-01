import { MongoClient, ServerApiVersion } from 'mongodb';
import config from './config.js';

const connect_uri = config.CONNECTION_STR;
const client = new MongoClient(connect_uri, {
  connectTimeoutMS: 2000,
  serverSelectionTimeoutMS: 2000,
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connect() {
  try {
    await client.connect();
    await client.db('lab5db').command({ ping: 1 });
    const currentDate = new Date().toLocaleString('en-US', { timeZone: 'Asia/Hong_Kong' });
    console.log(`${currentDate}`);
    console.log(`Server started at http://127.0.0.1:8080`);
    console.log('Successfully connected to the database!');
  } catch (err) {
    console.error('Unable to establish connection to the database!');
    process.exit(1);
  }
}
connect().catch(console.dir);
export default client;