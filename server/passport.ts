const GoogleStrategy = require('passport-google-oauth20');
import { User } from '../server/graphql/types/User';
import passport from  'passport';

passport.use(new GoogleStrategy({
    clientID: "921604575160-muj1vijp8gc4apqrj9uca0eht01m74hp.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:5000/api/callback",
    state: ["profile"],
  },
  function(accessToken: unknown, refreshToken: unknown, profile: unknown, cb: any) {
      console.log('passport', accessToken);
      if (!accessToken) return cb('error', null);
      return cb(null, {
        id: 'testyes',
      });
  }
));



passport.serializeUser((user, done) => {
    process.nextTick(function () {
    done(null, { id: 'testyes' });
  });
});
passport.deserializeUser((id, done) => {
//   const users = User.getUsers();
//   const matchingUser = users.find(user => user.id === id);
//   done(null, matchingUser);
 process.nextTick(function () {
    return done(null, { id: 'testyes' });
  });
});



export default passport;