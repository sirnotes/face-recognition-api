const handleSignin = (db, bcrypt, req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return Promise.reject('invalid form submission');
	}

	return db.select('email','hash')
		.from('login')
		.where('email', '=', email)
		.then(login => bcrypt.compare(password, login[0].hash))
		.then(res => {
			if (!res) return Promise.reject();

			return db.select('*').from('users')
				.where('email', '=', email)
				.then(user => user[0])
				.catch(err => Promise.reject())
		})
		.then( data => data )
		.catch(err => Promise.reject(`invalid credntials`))
}

const getAuthToken = () => {
	console.log('auth ok');
}

const authSignin = (db, bcrypt) => (req, res) => {
	const { authorization } = req.headers;
	return authorization ?
		getAuthToken() :
		handleSignin(db, bcrypt, req, res)
			.then(data => res.json(data))
			.catch(err => res.status(400).json(err) );
}

module.exports = { authSignin }
