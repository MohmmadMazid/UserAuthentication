const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const UserM = require("./model/userSchema");
async function authenticationInitiliaze(passport) {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      let user = await UserM.findOne({ username: username });
      if (!user) {
        return done(null, false);
      }
      if (password !== user.password) {
        return done(null, false);
      } else {
        return done(null, user);
      }
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await UserM.findById(id);
      done(null, user);
    } catch (err) {
      done(err, user);
    }
  });
}

module.exports = authenticationInitiliaze;
