import express from 'express';
import multer from 'multer';
import fs from 'fs/promises';
import { validate_user, update_user, fetch_user, username_exist } from './userdb.js';

//const users = new Map();
const router = express.Router();
const form = multer();

/*
async function init_userdb() {
  if (users.size > 0) return;
  try {
    const data = await fs.readFile('users.json', 'utf-8');
    const userData = JSON.parse(data);
    userData.forEach((user) => {
      users.set(user.username, user);
    });
  } catch (error) {
    console.error('Error reading users.json:', error);
  }
}

async function validate_user(username, password) {
  const user = users.get(username);
  if (!user || user.password !== password) {
    return false;
  }
  return user;
}

async function update_user(username, password, role) {
  const user = {
    username,
    password,
    role,
    enabled: true,
  };
  users.set(username, user);
  const userjson = [];
  users.forEach((value) => userjson.push(value));
  try {
    await fs.writeFile('users.json', JSON.stringify(userjson, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing to users.json:', error);
    return false;
  }
}
*/

router.post('/login', form.none(), async (req, res) => {
  //await init_userdb();
  const { username, password } = req.body;
  req.session.logged = req.session.logged || false;
  if (req.session.logged) {
    req.session.logged = false;
  }
  const user = await validate_user(username, password);
  if (user) {
    if (!user.enabled) {
      return res.status(401).json({
        status: 'failed',
        message: `User \`${username}\` is currently disabled`,
      });
    }
    req.session.logged = true;
    req.session.username = user.username;
    req.session.role = user.role;
    req.session.timestamp = new Date();
    return res.json({
      status: 'success',
      user: {
        username: user.username,
        role: user.role,
      },
    });
  }
  res.status(401).json({
    status: 'failed',
    message: 'Incorrect username and password',
  });
});

router.post('/register', form.none(), async (req, res) => {
  //await init_userdb();
  const { username, password, role } = req.body;
  if (!username || !password) {
    return res.status(400).json({ status: 'failed', message: 'Missing fields' });
  }
  if (username.length < 3) {
    return res.status(400).json({ status: 'failed', message: 'Username must be at least 3 characters' });
  }
  if (username_exist(username)) {
    return res.status(400).json({ status: 'failed', message: `Username ${username} already exists` });
  }
  if (password.length < 8) {
    return res.status(400).json({ status: 'failed', message: 'Password must be at least 8 characters' });
  }
  if (role !== 'user' && role !== 'student') {
    return res.status(400).json({ status: 'failed', message: 'Role can only be either "student" or "user"' });
  }
  const success = await update_user(username, password, role);
  if (success) {
    return res.status(201).json({
      status: 'success',
      user: {
        username,
        role,
      },
    });
  } else {
    return res.status(500).json({ status: 'failed', message: 'Account created but unable to save into the database' });
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged) {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: 'Could not log out' });
      }
      return res.end();
    });
  } else {
    res.status(401).json({
      status: 'failed',
      message: 'Unauthorized',
    });
  }
});

router.get('/me', async (req, res) => {
  if (req.session.logged) {
    const user = fetch_user(req.session.username);
    return res.json({
      status: 'success',
      user: {
        username: user.username,
        role: user.role,
      },
    });
  }
  res.status(401).json({
    status: 'failed',
    message: 'Unauthorized',
  });
});
export default router;