const GoogleStrategy = require('passport-google-oauth20');
import passport from 'passport';
import prisma from '../server/singletons/prisma';

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
            email: profile?.emails[0].value,
          },
        });
        if (!user) {
          const res = await prisma.user.create({
            data: {
              kind: 'user',
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
          return cb(null, res);
        } else {
          return cb(null, user);
        }
      } catch (e) {
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
