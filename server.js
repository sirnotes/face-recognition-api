const express = require('express');
const bodyParser = require('body-parser');

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
			password: 'chips',
			entries: 0,
			joined: new Date()
		}
	]
}

server.use(bodyParser.json());

server.get('/', (req, res) => {
	res.json(database.users);
})

server.post('/signin', (req, res) => {
	if (database.users[0].email === req.body.email &&
		database.users[0].password === req.body.password) {
		res.json('success');
	} else {
		res.status(400).json('error logging in');
	}
})

server.post('/register', (req, res) => {
	database.users.push({
		id: database.users.length + 123,
		email: req.body.email,
		name: req.body.name,
		password: req.body.password,
		entries: 0,
		joined: new Date()
	});
	res.json(database.users[database.users.length-1]);
})

server.listen(3000, () => {
	console.log('Server is running on port 3000');
});
