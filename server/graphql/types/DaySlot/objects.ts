import { objectType } from 'nexus';

export const DaySlot = objectType({
  name: 'DaySlot',
  definition(t) {
    t.field('startTime', {
      type: 'DateTime',
    });
    t.field('endTime', {
      type: 'DateTime',
    });
    /*  t.nulable.field('bookedStartTime', {
      type: 'bookedEndTime',
    });
    t.nullable.field('bookedEndTime', {
      type: 'DateTime',
    }); */

    // Todo
    /*     t.nullable.string('bookedStartTime');
    t.nullable.string('bookedEndTime'); */
    /*  t.field('propertySlot', {
      type: PropertySlot,
      async resolve(parent, args, ctx) {
        return await ctx.prisma.propertySlot.findUnique({
          where: {
            id: parent.propertySlotId,
          },
        });
      },
    }); */
    /* 
    
    */
  },
});
