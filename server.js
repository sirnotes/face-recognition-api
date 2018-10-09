const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const index = require('./controllers/index');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
	client: 'pg',
	connection: {
		host: '127.0.0.1',
		user: 'ken',
		password: '',
		database: 'face-recognition'
	}
});

const server = express();

server.use(bodyParser.json());
server.use(cors());

server.get('/', index.handleIndex(db))
server.post('/signin', signin.handleSignin(db, bcrypt))
server.post('/register', register.handleRegister(db, bcrypt))
server.get('/profile/:id', profile.handleProfileGet(db))
server.put('/image', image.handleImage(db))
server.post('/imageurl', image.handleApiCall)

server.listen(proces.env.PORT || 3000, () => {
	console.log(`Server is running on port ${prcoess.env.PORT}`);
});
