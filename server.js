const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
        host: 'ec2-18-208-24-104.compute-1.amazonaws.com',
        user: 'bloypybwqttopv',
        password: '2d64eb5ec34bfba830d1eaa538d1416d386f8e63cdca538bdc3fff2659098d2f',
        database: 'dbegvn4k00l3gq',
        ssl: { require: false, rejectUnauthorized: false }
    }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {res.send('it is workings')});

app.post('/signin', signin.handleSignin(db, bcrypt)); // alternative formatting function

app.post('/register',(req, res) => {register.handleRegister(req, res, db, bcrypt)});

app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, db)});

app.put('/image', (req, res) => {image.handleImage(req, res, db)});
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)});

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`);
});

