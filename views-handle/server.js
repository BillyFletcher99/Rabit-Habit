const express = require('express')
const app = express()
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
//Hashes passwords, and also compares hashed passwords to make sure of security// *crashing and not working correctly
const bcryptjs = require('bcryptjs');


if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }




//finds users based on email,
const initializePassport = require('./passport-config')
initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
)


//for getting information from forms, and should give access to them via post methods//
app.use(express.urlencoded({ extended: false}))

//Secret is a key that will encrypt information, key is named SESSION_SECRET
//Resave will not save anything, if nothing is changed from last session
app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

//Should make it so CSS/ and Images are available through local host ejs
app.use(express.static('public'));
//Local variable storage, inside server, used for storing users
const users = []

// View-engine works off of ejs dependency, can be used in template,
// when testing localhost3000 on index.ejs 
// Ejs is just used to render html string through express
app.set('view-engine' , 'ejs' , 'html');

//***GETS***//
app.get('/', (req, res) => {
    res.render('index.ejs', { name: req.user.name})
})

app.get('/login', (req, res) => {
    res.render('login.ejs')
})

app.get('/register', (req, res) => {
    res.render('register.ejs')
})

//***POSTS***//
//Successful will take you to homepage, redirect will take you to login
app.post('/index', passport.authenticate('local',{
    successRedirect: '/',
    failureRedirect: '/register',
    failureFlash: true,

}))

// Function as async, to use try/catch inside
// Hashed password is being passed in the password slot, generated 10 times
app.post('/register', async (req, res) => {
    try{
        const hasedPassword = await bcryptjs.hash(req.body.password, 10)
//Everything below will be used when the user is creating their account
//Name, Email, Password(using bcrypt to hash), and the current time stamp
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hasedPassword
        })
// If successful register, redirected to login page, otherwise back to register
        res.redirect('/login')

    }
    catch{
        res.redirect('/register')

    }
    console.log(users)

})
app.listen(3000);