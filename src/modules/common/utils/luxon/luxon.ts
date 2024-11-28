import { HOUR_MS, MINUTE_MS, SECOND_MS } from '@stone-flower-org/js-utils';

import { luxon } from '@/src/modules/app/boot';

export const updateDateSafe = (
  date: luxon.DateTime,
  update: (date: luxon.DateTime) => luxon.DateTime,
  def?: luxon.DateTime,
) => {
  const updated = update(date);
  return updated.isValid ? updated : def;
};

export const getTimeMsTillMillisecond = (date: luxon.DateTime) => date.millisecond;

export const getTimeMsTillSecond = (date: luxon.DateTime) => date.second * SECOND_MS + getTimeMsTillMillisecond(date);

export const getTimeMsTillMinute = (date: luxon.DateTime) => date.minute * MINUTE_MS + getTimeMsTillSecond(date);

export const getTimeMsTillHour = (date: luxon.DateTime) => date.hour * HOUR_MS + getTimeMsTillMinute(date);
