const express = require('express')
const path = require('path')
const pg = require('pg')
const Api = require('./js/api')
const PORT = process.env.PORT || 5000

const api = new Api();

express()
    //.use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    //.set('view engine', 'ejs')
    //.get('/', (req, res) => res.render('pages/index'))
    .get('/fetchPosts', (req, res) => res.send(api.fetchPosts()))
    .listen(PORT, () => console.log(`Listening on ${ PORT }`))