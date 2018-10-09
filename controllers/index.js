const handleIndex = (db) => (req, res) => {
	res.json('system is operational')
	// db.select('*').from('users')
	// 	.then(users => {
	// 		res.json(users)
	// 	})
	// 	.catch(err => {
	// 		res.status(404).json('error getting users')
	// 	});
}

module.exports = { handleIndex };
