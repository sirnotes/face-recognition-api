const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

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

server.get('/', (req, res) => {
	db.select('*').from('users')
		.then(users => {
			res.json(users)
		})
		.catch(err => {
			res.status(404).json('error getting users')
		});
})

server.post('/signin', (req, res) => {
	const { email, password } = req.body;
	db.select('email','hash').from('login')
		.where('email', '=', email)
		.then(login => {
			return bcrypt.compare(password, login[0].hash, (err, valid) => {
				if (valid) {
					return db.select('*').from('users')
						.where('email', '=', email)
						.then(user => res.json(user[0]))
						.catch(err => res.status(400).json('unable to get user'))
				}
				res.status(400).json('invalid credentials');
			})
		})
		.catch(err => res.status(400).json('invalid credentials'))
})

server.post('/register', (req, res) => {
	const{ email, name, password } = req.body;
	bcrypt.hash(password, null, null, (err, hash) => {
		db.transaction(trx => {
			trx.insert({
				hash: hash,
				email: email
			})
			.into('login')
			.returning('email')
			.then(loginEmail => {
				return trx('users')
					.returning('*')
					.insert({
						name: name,
						email: loginEmail[0],
						joined: new Date()
						})
					})
					.then(user => {
						res.json(user[0]);
					})
			.then(trx.commit)
			.catch(trx.rollback)
		})
		.catch(err => res.status(400).json('unable to register'))
	})
})

server.get('/profile/:id', (req, res) => {
	const { id } = req.params;
	db.select('*').from('users').where({id})
		.then(user => {
			if (user.length) {
				res.json(user[0])
			} else {
				res.status(400).json('user not found')
			}
		})
		.catch(err => res.status(400).json('error getting user'))
})

server.put('/image', (req, res) => {
	const { id } = req.body;
	db('users').where({id}).increment('entries', 1)
		.returning('entries')
		.then(entries => res.json(entries[0]))
		.catch(err => res.status(400).json('error processing request'));
})
server.listen(3000, () => {
	console.log('Server is running on port 3000');
});
