const express = require('express');
const path = require('path');
const dotenv = require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', express.static(path.resolve('src/client')));
app.use('/styles', express.static(path.resolve('src/client/styles')));
app.use('/javascript', express.static(path.resolve('src/client/scripts')));

app.use('/landing', express.static(path.resolve('src/client/pages/landing')));
app.use('/data', express.static(path.resolve('src/client/pages/data')));

const dataupload = require('./upload/dataupload.js');
const datadownload = require('./download/datadownload.js');

app.get('/', (req, res) => {
    res.status(200).sendFile(path.resolve('src/client/pages/landing/index.html'));
});

app.get('/data', (req, res) => {
    res.status(200).sendFile(path.resolve('src/client/pages/data/index.html'));
});

app.listen(process.env.PORT, () => {
    console.log('listening on the port', process.env.PORT);
});

app.use('/uploadinfo', async (req, res) => {
    var response = await dataupload.uploadInfo(req.body.friendlyName, req.body.diveNum, req.body.latitude, req.body.longitude, req.body.posaccuracy, req.body.altitude, req.body.altaccuracy, req.body.heading, req.body.speed, req.body.timestamp);

    if (response[0] != 200){

    }

    res.sendStatus(200);
});

app.use('/downloadinfo', async (req, res) => {
    var response = await datadownload.downloadInfo(req.body.friendlyName, req.body.diveNum);

    if (response[0] != 200){

    }

    res.status(200).json(JSON.stringify(response[1]));
});