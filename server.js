const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const server = express();

const database = {
	users: [
		{
			id: '123',
			name: 'John',
			email: 'john.smith@example.com',
			password: 'cookies',
			entries: 0,
			joined: new Date()
		},
		{
			id: '124',
			name: 'Sally',
			email: 'sally.smith@example.com',
			password: 'bananas',
			entries: 0,
			joined: new Date()
		}
	],
	login: [
		{
			id: 987,
			hash: '',
			email: 'john.smith@example.com'
		},
		{
			id: 988,
			hash: '',
			email: 'sally.smith@example.com'
		}
	]
}

server.use(bodyParser.json());
server.use(cors());

server.get('/', (req, res) => {
	res.json(database.users);
})

server.post('/signin', (req, res) => {
	const { email, password } = req.body;

	if (database.users[0].email === email &&
		database.users[0].password === password) {
		res.json(database.users[0]);
	} else {
		res.status(400).json('error logging in');
	}
})

server.post('/register', (req, res) => {
	const{ email, name, password } = req.body;
	bcrypt.hash(password, null, null, (err, hash) => {
		database.login.push({
			id: database.login.length,
			email: email,
			hash: hash
		});
	});
	database.users.push({
		id: database.users.length + 123,
		email: email,
		name: name,
		entries: 0,
		joined: new Date()
	});
	res.json(database.users[database.users.length-1]);
})

server.get('/profile/:id', (req, res) => {
	const { id } = req.params;
	let found = false;
	database.users.forEach(user => {
		if (user.id === id) {
			found = true;
			return res.json(user);
		}
	})

	if (!found) {
		res.status(400).json('no such user');
	}
})

server.put('/image', (req, res) => {
	const { id } = req.body;
	let found = false;

	database.users.forEach(user => {
		if (user.id == id) {
			found = true;
			user.entries++
			return res.json(user.entries);
		}
	})

	if (!found) {
		res.status(400).json('no such user');
	}
})
server.listen(3000, () => {
	console.log('Server is running on port 3000');
});
