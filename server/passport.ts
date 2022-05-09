const GoogleStrategy = require('passport-google-oauth20');
import passport from 'passport';
import prisma from '../server/singletons/prisma';
import datasources from './singletons/datasources';
import { v4 as uuidv4 } from 'uuid';
//import FacebookStrategy from 'passport-facebook'
const FacebookStrategy = require('passport-facebook').Strategy;


const { stripeWrapper } = datasources();

passport.use(
 /*  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.SERVER_URL+'/api/callback',
      state: true,
    }, */
    new FacebookStrategy({
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: process.env.SERVER_URL + "/auth/facebook/callback",
      proxy: true
      //profileFields: ['email']
    },
    function (accessToken: any, refreshToken: any, profile: any, cb: any) {
      console.log("enther authenticate")
      return cb(null);
    }
  /*   async function (accessToken: unknown, refreshToken: unknown, profile: any, cb: any) {
      console.log("Envs: "+process.env.FACEBOOK_APP_ID+ " "+process.env.FACEBOOK_APP_SECRET)
      return cb(null, profile) */
     /*  try {
        if (!accessToken || !profile) return cb('error', null);
        const user = await prisma.user.findUnique({
          where: {
            email: profile?.emails[0].value ?? '',
          },
        });
        console.log('user first');
        if (!user) {
          // Create user for them on stripe
          const stripeId = await stripeWrapper.createCustomer({ email: profile.emails[0].value });
          const res = await prisma.user.create({
            data: {
              kind: 'user',
              stripeId: uuidv4(),  // Needs to be 'cus_Kza1oi2OTlvcpb' to get datastripeId.response.success?.body.id,
              handle: profile.emails[0].value,
              fullName: profile.displayName,
              email: profile.emails[0].value,
              image: profile.picture,
              isVerified: false,
              role: 'tenant',
              bookings: { create: [] },
              rentingOut: { create: [] },
              superOwner: false,
            },
          });
          console.log('user');
          return cb(null, res);
        } else {
          console.log('cb');
          return cb(null, user);
        }
      } catch (e) {
        console.log('ERROR', e);
        return cb(e);
      }
    } */
  )
);

passport.serializeUser((user, done) => {
  process.nextTick(function () {
    done(null, { id: 'testyes' });
  });
});
passport.deserializeUser((id, done) => {
  process.nextTick(function () {
    return done(null, { id: 'testyes' });
  });
});



export default passport;
