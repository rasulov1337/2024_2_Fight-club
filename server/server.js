'use strict';

const express = require('express');
const body = require('body-parser');
const path = require('path');
const app = express();

app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.use(express.static(path.resolve(__dirname, 'images')));
app.use(body.json());

const port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log(`Server listening port ${port}`);
});