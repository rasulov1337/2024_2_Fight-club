'use strict'

const express = require('express')
const body = require('body-parser')
const path = require('path')
const app = express()

app.use(express.static(path.resolve(__dirname, '..', 'public')))
app.use(express.static(path.resolve(__dirname, '..', 'node_modules')))
app.use(express.static(path.resolve(__dirname, 'images')))
app.use(body.json())

const port = 80

app.listen(port, function () {
    console.log(`Server listening port ${port}`)
})
