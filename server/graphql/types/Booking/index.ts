import { objectType } from 'nexus';

export const Booking = objectType({
  name: 'Booking',
  definition(t) {
    t.string('id');
  },
});