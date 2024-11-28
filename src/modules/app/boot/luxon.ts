import { ServiceProvider } from '@stone-flower-org/js-app';
import * as luxon from 'luxon';

import { app } from './app';

export const luxonProvider = ServiceProvider.createFromFunc(async () => {
  const [{ APP_LOCALE, APP_TZ }] = await app.bootServices(['configs']);
  luxon.Settings.defaultLocale = APP_LOCALE;
  luxon.Settings.defaultZone = APP_TZ;
  return luxon;
});

export * as luxon from 'luxon';
