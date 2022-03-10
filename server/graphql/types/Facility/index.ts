import { objectType } from 'nexus';

export const Facility = objectType({
  name: 'Facility',
  definition(t) {
    t.string('id');
  },
});