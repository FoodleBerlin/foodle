import { objectType } from 'nexus';

export const BookingSlot = objectType({
  name: 'BookingSlot',
  definition(t) {
    t.string('id');
  },
});