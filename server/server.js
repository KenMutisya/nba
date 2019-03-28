const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const router = require('./router.js');


const app = express();

mongoose.connect('mongodb://localhost:27017/nba', {
    useNewUrlParser: true
});

app.use(bodyParser.json());

app.use(
    cors({
        origin: ['http://localhost:3000'],
        methods: ['GET', 'HEAD', 'POST', 'DELETE', 'PUT', 'PATCH', 'OPTIONS'],
        credentials: true
    })
);

app.use('/api', router);

app.get('/', (req, res) => {
    res.send({
        hey: mongoose.connection.readyState
    });
});

// eslint-disable-next-line no-console
app.listen(8080, () => console.log('Listening on http://localhost:8080'));