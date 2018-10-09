const handleSignin = (db, bcrypt) =>  (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(400).json('invalid form submission');
	}
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
}

module.exports = { handleSignin }
