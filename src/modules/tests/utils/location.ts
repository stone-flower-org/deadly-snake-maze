const { location: oldLocation } = window;

export const setupLocation = (url: string | URL = window.origin) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delete (window as any).location;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).location = new URL(url);
};

export const clearLocation = () => {
  window.location = oldLocation;
};
