import moment from 'moment';
import { clean } from '../utils/clean';
import { seed } from '../utils/seed';
import { ValidatorService } from './../server/singletons/validatorService';

beforeAll(async () => {
  await clean();
  await seed();
});

describe('test checkForEmtpyList', () => {
  it('fail checkForEmptyList', () => {
    const testList = ['test'];
    const actual = ValidatorService.checkForEmptyList(testList);
    expect(actual).toBe(false);
  });
  it('success checkForEmtpyList', () => {
    const testList: string[] = [];
    const actual = ValidatorService.checkForEmptyList(testList);
    expect(actual).toBe(true);
  });
});

describe('test validateStartEndDate', () => {
  it('fail startDate after endDate', () => {
    const startDate = moment('2022-08-27T18:00:00.000+0200');
    const endDate = moment('2022-08-26T18:00:00.000+0200');
    const actual = ValidatorService.validateStartEndDate(startDate, endDate);
    expect(actual).toBe(false);
  });

  it('success startDate = endDate', () => {
    const startDate = moment('2022-08-27T18:00:00.000+0200');
    const endDate = moment('2022-08-27T18:00:00.000+0200');
    const actual = ValidatorService.validateStartEndDate(startDate, endDate);
    expect(actual).toBe(true);
  });

  it('success startDate after endDate', () => {
    const startDate = moment('2022-08-27T18:00:00.000+0200');
    const endDate = moment('2022-08-28T18:00:00.000+0200');
    const actual = ValidatorService.validateStartEndDate(startDate, endDate);
    expect(actual).toBe(true);
  });
});

describe('test propertyExists', () => {
  it('fail with non existing handle', async () => {
    const prop = await ValidatorService.propertyExists('non-existing-handle');
    expect(prop).toBeNull;
  });
  it('success with handle prop1', async () => {
    const prop = await ValidatorService.propertyExists('prop1');
    expect(prop).toBeTruthy();
  });
});

describe('test userExists', () => {
  it('fail with non existing id', async () => {
    const user = await ValidatorService.userExists('non-existing-id');
    expect(user).toBeNull;
  });
  it('success with id 1', async () => {
    const user = await ValidatorService.userExists('1');
    expect(user).toBeTruthy();
  });
});

describe('test isOverMaxLength', () => {
  it('fail, 31 characters', () => {
    expect(ValidatorService.isOverMaxLength('fooooooooooooooooooooooooooodle', 30));
  });
  it('success, 30 characters', () => {
    expect(ValidatorService.isOverMaxLength('foooooooooooooooooooooooooodle', 30));
  });
});

describe('test validateDaySlot', () => {
  const weekday: 7 | 4 | 5 | 6 | 3 | 1 | 2 = 6;
  it('fails, time of startTime after time of endTime', () => {
    const day = {
      startTime: '2022-08-27T19:00:00.000+0200',
      endTime: '2022-08-27T18:00:00.000+0200',
      weekday: weekday,
    };
    expect(ValidatorService.validateDaySlot(day)).toBe(false);
  });
  it('fails, date of startTime after date of endTime', () => {
    const day = {
      startTime: '2022-08-27T10:00:00.000+0200',
      endTime: '2022-08-28T18:00:00.000+0200',
      weekday: weekday,
    };
    expect(ValidatorService.validateDaySlot(day)).toBe(false);
  });
  it('fails startTime = endTime', () => {
    const day = {
      startTime: '2022-08-27T10:00:00.000+0200',
      endTime: '2022-08-27T10:00:00.000+0200',
      weekday: weekday,
    };
    expect(ValidatorService.validateDaySlot(day)).toBe(false);
  });
  it('fails weekday not equal to weekDay of startTime', () => {
    const weekday: 7 | 4 | 5 | 6 | 3 | 1 | 2 = 5;
    const day = {
      startTime: '2022-08-27T10:00:00.000+0200',
      endTime: '2022-08-27T18:00:00.000+0200',
      weekday: weekday,
    };
    expect(ValidatorService.validateDaySlot(day)).toBe(false);
  });
  it('success', () => {
    const day = {
      startTime: '2022-08-27T10:00:00.000+0200',
      endTime: '2022-08-27T18:00:00.000+0200',
      weekday: weekday,
    };
    expect(ValidatorService.validateDaySlot(day)).toBe(true);
  });
});
