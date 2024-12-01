import fs from 'fs/promises';
import client from './dbclient.js';

async function init_db() {
  try {
    const users = client.db('lab5db').collection('users');
    const count = await users.countDocuments();
    if (count === 0) {
      const data = await fs.readFile('users.json', 'utf-8');
      const userData = JSON.parse(data);
      const result = await users.insertMany(userData);
      console.log(`Added ${result.insertedCount} users`);
    }
  } catch (err) {
    console.error('Unable to initialize the database!');
  }
}

async function validate_user(username, password) {
  if (!username || !password) {
    return false;
  }
  const users = client.db('lab5db').collection('users');
  try {
    const user = await users.findOne({ username, password });
    if (user) {
      return user;
    } else {
      return false;
    }
  } catch (err) {
    console.error('Unable to fetch from database!');
    return false;
  }
}

async function update_user(username, password, role, enabled) {
  const users = client.db('lab5db').collection('users'); // Reference to the users collection
  const userProfile = {
    username,
    password,
    role,
    enabled,
  };
  try {
    const result = await users.updateOne({ username }, { $set: userProfile }, { upsert: true });
    if (result.upsertedCount > 0) {
      console.log(`Added 1 users`);
    } else {
      console.log(`Added 0 users`);
    }
    return true;
  } catch (err) {
    console.error('Unable to update the database!');
    return false;
  }
}

async function fetch_user(username) {
  const users = client.db('lab5db').collection('users');
  try {
    const user = await users.findOne({ username });
    return user;
  } catch (err) {
    console.error('Unable to fetch from database!');
    return null;
  }
}

async function username_exist(username) {
  try {
    const user = await fetch_user(username);
    return user !== null;
  } catch (err) {
    console.error('Unable to fetch from database!');
    return false;
  }
}
init_db().catch(console.dir); 

export { validate_user, update_user, fetch_user, username_exist };
