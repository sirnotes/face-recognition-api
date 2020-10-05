const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: process.env.CLARIFAI_KEY
});

const handleApiCall = (req, res) => {
	app.models
		.predict(Clarifai.DEMOGRAPHICS_MODEL, req.body.input)
		.then(data => { res.json(data) })
		.catch(err => res.status(400).json('api call failed.'))
}

const handleImage = (db) => (req, res) => {
	const { id } = req.body;
	db('users').where({id}).increment('entries', 1)
		.returning('entries')
		.then(entries => res.json(entries[0]))
		.catch(err => res.status(400).json('error processing request'));
}
module.exports = { handleImage, handleApiCall }
