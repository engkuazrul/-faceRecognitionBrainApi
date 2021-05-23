const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '33ae7ac179b94a39b5d36b4a6778a499'
});

const handleApiCall = (req, res) => {
    app.models
    .predict("f76196b43bbd45c99b4f3cd8e8b40a8a", req.body.input)
    .then(data => res.json(data))
    .catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res, db) => {
    const { id } = req.body;

    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(err => {
            res.status(400).json('Unable to get entries');
        })
}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
};