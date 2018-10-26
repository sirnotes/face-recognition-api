require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex');
const morgan = require('morgan');

const index = require('./controllers/index');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const auth = require('./middleware/authorization');

const db = knex({
	client: 'pg',
	connection: {
		connectionString: process.env.POSTGRES_URI
	}
});

const server = express();

server.use(bodyParser.json());
server.use(cors());
server.use(morgan('combined'));

server.get('/', index.handleIndex(db))
server.post('/signin', signin.authSignin(db, bcrypt))
server.post('/register', register.handleRegister(db, bcrypt))
server.get('/profile/:id', auth.requireAuth, profile.handleProfileGet(db))
server.post('/profile/:id', auth.requireAuth, profile.handleProfileUpdate(db))
server.put('/image', auth.requireAuth,  image.handleImage(db))
server.post('/imageurl', auth.requireAuth,  image.handleApiCall)

server.listen(process.env.PORT || 3000, () => {
	console.log(`Server is running on port ${process.env.PORT}`);
});
