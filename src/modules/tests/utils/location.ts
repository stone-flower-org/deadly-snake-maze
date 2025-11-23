const { location: oldLocation } = window;

export const setupLocation = (url: string | URL = window.origin) => {
  // biome-ignore lint/performance/noDelete: set location in tests
  // biome-ignore lint/suspicious/noExplicitAny: set location in tests
  delete (window as any).location;
  // biome-ignore lint/suspicious/noExplicitAny: set location in tests
  (window as any).location = new URL(url);
};

export const clearLocation = () => {
  // biome-ignore lint/suspicious/noExplicitAny: set location in tests
  (window as any).location = oldLocation;
};
