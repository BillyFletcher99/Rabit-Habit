const express = require('express');
const app = express();

//Hashes passwords, and also compares hashed passwords to make sure of security//
const bcyrpt = require('bcrpyt');

//for getting information from forms, and should give access to them via post methods//
app.use(express.urlencoded({ extended: false}))

//Local variable storage, inside server, used for storing users
const users = []

// View-engine works off of ejs dependency, can be used in template,
// when testing localhost3000 on index.ejs 
// Ejs is just used to render html string through express
app.set('view-engine' , 'ejs');

//***GETS***//
app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.get('/login', (req, res) => {
    res.render('login.ejs')
})

app.get('/register', (req, res) => {
    res.render('register.ejs')
})

//***POSTS***//
app.post('/login', (req, res) => {

})

app.post('/register', (req, res) => {

})

app.listen(3000);