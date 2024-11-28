import { vi } from 'vitest';

export interface IntersectionObserverMock extends IntersectionObserver {
  new (callback: IntersectionObserverCallback, options?: IntersectionObserverInit): IntersectionObserver;
  clear: () => void;
  emitIntersected: typeof BaseIntersectionObserver.emitIntersected;
}

export class BaseIntersectionObserver {
  static listeners: IntersectionObserverCallback[] = [];

  static emitIntersected(entries: IntersectionObserverEntry[]) {
    this.listeners.forEach((listener) => listener(entries, {} as unknown as IntersectionObserverMock));
  }

  static clear() {
    this.listeners = [];
  }

  constructor(callback?: IntersectionObserverCallback) {
    const instanceListener = callback;
    instanceListener && (this.constructor as typeof BaseIntersectionObserver).listeners.push(instanceListener);
    return {
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn().mockImplementation(() => {
        (this.constructor as typeof BaseIntersectionObserver).listeners = (
          this.constructor as typeof BaseIntersectionObserver
        ).listeners.filter((listener) => instanceListener !== listener);
      }),
    };
  }
}

export const makeIntersectionObserver = () => {
  class IntersectionObserver extends BaseIntersectionObserver {
    static listeners: ((entries: IntersectionObserverEntry[]) => void)[] = [];
  }

  return IntersectionObserver as unknown as IntersectionObserverMock;
};
