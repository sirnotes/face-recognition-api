const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex');
const morgan = require('morgan');
const compression = require('compression');

const index = require('./controllers/index');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const auth = require('./middleware/authorization');

const db = knex({
	client: 'pg',
	connection: {
		connectionString: process.env.DATABASE_URL
	}
});

const allowedOrigins = [
	'http://localhost:3000',
	'https://kennithnichol.github.io'
]

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors({
	origin: function( origin, callback) {
		if (!origin) return callback(null, true);
		if (allowedOrigins.indexOf(origin) === -1) {
			var msg = 'The CORS policy for this site does not ' +
				'allow access from the specified Origin.';
			return callback(new Error(msg), false);
		}

		return callback(null, true);
	}
}));
server.use(morgan('combined'));
server.use(compression());

server.get('/', index.handleIndex())
server.post('/signin', signin.authSignin(db, bcrypt))
server.post('/register', register.handleRegister(db, bcrypt))
server.get('/profile/:id', auth.requireAuth, profile.handleProfileGet(db))
server.post('/profile/:id', auth.requireAuth, profile.handleProfileUpdate(db))
server.put('/image', auth.requireAuth,  image.handleImage(db))
server.post('/imageurl', auth.requireAuth,  image.handleApiCall)

server.listen(process.env.PORT || 3000, () => {
	console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
