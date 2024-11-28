export const makeInMemoryCookies = () => {
  const store: Record<string, unknown> = {};
  return {
    set: (key: string, val: unknown) => {
      store[key] = val;
      return val;
    },
    get: (key: string) => store[key],
    remove: (key: string) => {
      delete store[key];
    },
    withAttributes: () => makeInMemoryCookies(),
    withConverter: () => makeInMemoryCookies(),
  };
};
