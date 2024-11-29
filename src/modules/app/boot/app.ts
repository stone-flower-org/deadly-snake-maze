import { App as AppContainer } from '@stone-flower-org/js-app';
import { createElement } from 'react';
import { createRoot } from 'react-dom/client';

import { APP_ELEMENT_ID } from '@/src/modules/app/constants';
import { App as AppComponent } from '@/src/modules/app/ui/components/App';
import { AppServices } from '@/src/modules/app/utils/app';

import { axiosProvider } from './axios';
import { configsProvider } from './configs';
import { luxonProvider } from './luxon';
import { routerProvider, routesStoreProvider } from './router';
import { storeProvider } from './store';

export const app = AppContainer.createFromFunc<AppServices>(() => {
  const appEl = document.getElementById(APP_ELEMENT_ID);
  if (!appEl) throw new Error(`Couldn't find #${APP_ELEMENT_ID} element`);
  createRoot(appEl).render(createElement(AppComponent));
});

app.registerProvider('configs', configsProvider);
app.registerProvider('date', luxonProvider);
app.registerProvider('http', axiosProvider);
app.registerProvider('store', storeProvider);
app.registerProvider('routesStore', routesStoreProvider);
app.registerProvider('router', routerProvider);
