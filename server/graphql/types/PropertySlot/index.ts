import { inputObjectType, objectType } from 'nexus';
import { Frequency, GenericDaySlot, Property} from '../';
import { GenericDaySlotInput } from '../GenericDaySlot';

export const PropertySlot = objectType({
  name: 'PropertySlot',
  definition(t) {
    t.field('startDate', {
      type: 'DateTime',
    });
    t.field('endDate', {
      type: 'DateTime',
    });
    t.int('minimumMonth');
    t.string('repeats');
    t.string('propertyId')
    t.nullable.field('property', {
      type: Property,
      async resolve(parent, args, ctx) {
        return await ctx.prisma.property.findUnique({
          where: {
            id: parent.propertyId,
          },
          include: {
            owner:true,
            bookings:true,
            availabilities:true,
          }
        });
      },
    });
    t.nonNull.list.field('availableDays', {
      type: GenericDaySlot,
      async resolve(parent, args, ctx) {
        return await ctx.prisma.genericDaySlot.findMany({
          where: {
            propertySlotId: parent.id,
          },
          include: {
            bookingSlot:true,
            propertSlot:true,
          }
        });
      },
    });
    t.field('frequency', {type: Frequency});
  }
}); 

export const PropertySlotInput = inputObjectType({
  name: 'PropertySlotInput',
  description: 'PropertySlot input',
  definition(t) {
    t.nonNull.field('startDate', {type: 'DateTime'});
    t.nonNull.field('endDate', {type: 'DateTime'});
    t.nonNull.int('minimumMonth');
    t.nonNull.string('repeats');
    t.nonNull.list.field('genericDaySlots', {type: GenericDaySlotInput});
    t.nonNull.field('frequency', {type: Frequency});
  },
});


