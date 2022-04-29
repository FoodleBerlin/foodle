const GoogleStrategy = require('passport-google-oauth20');
import passport from 'passport';
import prisma from '../server/singletons/prisma';
import datasources from './singletons/datasources';
import { v4 as uuidv4 } from 'uuid';

const { stripeWrapper } = datasources();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:5000/api/callback',
      state: true,
    },
    async function (accessToken: unknown, refreshToken: unknown, profile: any, cb: any) {
      try {
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
    }
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
