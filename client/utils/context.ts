import jwt from 'jsonwebtoken';

export const extractUserFromToken = (rawCookieToken: string | null, rawHeaderToken: string): any | null => {
  if (!rawHeaderToken && !rawCookieToken) return null;
  const decoded = jwt.verify(
    rawCookieToken ?? rawHeaderToken,
    process.env.SERVER_SECRET ?? '',
    (err: any, data: any) => {
      if (!err && data.user.id) {
        return data.user;
      } else {
        return null;
      }
    }
  );
  // JWT verify lib functionr returns void
  return decoded as unknown as any;
};
