import { objectType } from 'nexus';

export const DaySlot = objectType({
  name: 'DaySlot',
  definition(t) {
    t.string('id');
    t.string('date');
    t.string('startTime');
    t.string('endTime');
    /*   t.string('bookedStartTime');
    t.string('bookedEndTime'); */
    //propertySlot and booking
  },
});
