const GoogleStrategy = require('passport-google-oauth20');
import passport from 'passport';
import prisma from '../server/singletons/prisma';
import datasources from './singletons/datasources';

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
              stripeId: 'cus_Kza1oi2OTlvcp', // hardcoded for now so theres datastripeId.response.success?.body.id,
              handle: profile.emails[0].value,
              fullName: profile.displayName,
              email: profile.emails[0].value,
              image: profile.picture,
              zip: -1,
              description: 'I am from ...',
              isVerified: false,
              role: 'tenant',
              bookings: { create: [] },
              rentingOut: { create: [] },
              superOwner: false,
              passport: 'passportString',
              passportVerified: false,
              license: 'licenseString',
              licenseVerified: false,
              solvency: 'solvencyString',
              solvencyVerified: false,
            },
          });
          console.log('user');
          return cb(null, res);
        } else {
          console.log('cb');
          return cb(null, user);
        }
        console.log('here');
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
