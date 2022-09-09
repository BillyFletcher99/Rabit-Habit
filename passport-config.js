const LocalStrategy = require('passport-local').Strategy
const bcryptjs = require('bcryptjs')


//function takes in different params to authenticate user with
//Will return user by email, or display error message, in no associated email with user
function initialize(passport, getUserByEmail, getUserById) {
  const authenticateUser = async (email, password, done) => {
    const user = getUserByEmail(email)
    if (user == null) {
      return done(null, false, { message: 'No user found with that email' })
    }

    try {

      if (await bcryptjs.compare(password, user.password)) {
        return done(null, user)
      } 
      else {
        
        return done(null, false, { message: 'The password provided, is incorrect' })
      }
    } 
    catch (err) {
      
        return done(err)
    }
  }

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))


  //Serialize will store user in the session, deserializeUser should do opposite
  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser((id, done) => {
    return done(null, getUserById(id))
  })
}

module.exports = initialize