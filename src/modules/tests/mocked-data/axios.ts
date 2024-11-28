import { AxiosResponse } from 'axios';

export const createAxiosResponse = (attrs: Partial<AxiosResponse> = {}) => ({
  data: {},
  headers: {},
  status: 200,
  ...attrs,
});
