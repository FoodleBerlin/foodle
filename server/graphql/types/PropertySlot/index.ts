import { objectType } from 'nexus';

export const PropertySlot = objectType({
  name: 'PropertySlot',
  definition(t) {
    t.string('id');
  },
}); 