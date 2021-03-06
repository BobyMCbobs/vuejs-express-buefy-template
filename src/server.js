#!/usr/bin/node

const express = require('express')
const expressSession = require('express-session')
const bodyParser = require('body-parser')
const app = express()
const path = require('path')

// development port is 8080
var port = process.env.APP_PORT || 8080

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(expressSession({
    secret: 'abcdefghifjklmnopqrstuvwxyz1234567890',
    resave: false,
    saveUninitialized: false,
    cookie: {
        // 2 hours
        maxAge: 1000 * 60 * 60 * 2,
        sameSite: true,
        secure: process.env.NODE_ENV === 'production'
    }
}))

var routes = require('./routes')
app.use('/api', routes)

// Sends static files  from the public path directory
app.use(express.static(path.join(__dirname, '..', 'dist')))

// start service
app.listen(port, () => {
    console.log(`Running on port ${port}`)
})
  