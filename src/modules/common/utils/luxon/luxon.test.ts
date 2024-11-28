import { luxon } from '@/src/modules/app/boot';

import {
  getTimeMsTillHour,
  getTimeMsTillMillisecond,
  getTimeMsTillMinute,
  getTimeMsTillSecond,
  updateDateSafe,
} from './luxon';

const defaultDate = luxon.DateTime.fromISO('2023-01-01T01:02:03.400Z');

describe('updateDateSafe', () => {
  it('should return updated date when new date is valid', () => {
    const date = updateDateSafe(defaultDate, (date) => date.plus({ days: 1 }));
    expect(date?.toISO()).toBe('2023-01-02T01:02:03.400+00:00');
  });

  it('should return default value when updated date is invalid', () => {
    const date = updateDateSafe(defaultDate, () => luxon.DateTime.fromFormat('0', 'YYYY'), defaultDate);
    expect(date).toBe(defaultDate);
  });
});

describe('getTimeMsTillMillisecond', () => {
  it('should return date milliseconds', () => {
    expect(getTimeMsTillMillisecond(defaultDate)).toBe(400);
  });
});

describe('getTimeMsTillSecond', () => {
  it('should return date milliseconds and seconds converted to ms', () => {
    expect(getTimeMsTillSecond(defaultDate)).toBe(3400);
  });
});

describe('getTimeMsTillMinute', () => {
  it('should return date milliseconds, seconds and minutes converted to ms', () => {
    expect(getTimeMsTillMinute(defaultDate)).toBe(123400);
  });
});

describe('getTimeMsTillHour', () => {
  it('should return date milliseconds, seconds, minutes and hours converted to ms', () => {
    expect(getTimeMsTillHour(defaultDate)).toBe(3723400);
  });
});
