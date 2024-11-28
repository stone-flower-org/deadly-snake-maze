import { ServiceProvider } from '@stone-flower-org/js-app';
import baseAxios from 'axios';

export const axios = baseAxios.create({
  validateStatus: () => true,
});

export const axiosProvider = ServiceProvider.create(axios);
