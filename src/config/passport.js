const mongoose = require('mongoose')
const passport = require('passport')
const LocalStrategy = require('passport-local')

const User = mongoose.model('User')

passport.use(new LocalStrategy((email, password, done) => {
  User
    .findOne({ email })
    .then(user => {
      if(!user || !user.validatePassword(password)) {
        return done(null, false, { errors: { message: 'email or password is invalid' } });
      }
      return done(null, user)
    })
    .catch(done(err))
}))