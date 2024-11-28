import { vi } from 'vitest';

export interface MutationObserverMock extends MutationObserver {
  new (callback: MutationCallback): MutationObserver;
  clear: () => void;
  emitIntersected: typeof BaseMutationObserver.emitIntersected;
}

export class BaseMutationObserver {
  static listeners: MutationCallback[] = [];

  static emitIntersected(records: MutationRecord[]) {
    this.listeners.forEach((listener) => listener(records, {} as unknown as MutationObserverMock));
  }

  static clear() {
    this.listeners = [];
  }

  constructor(callback?: MutationCallback) {
    const instanceListener = callback;
    instanceListener && (this.constructor as typeof BaseMutationObserver).listeners.push(instanceListener);
    return {
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn().mockImplementation(() => {
        (this.constructor as typeof BaseMutationObserver).listeners = (
          this.constructor as typeof BaseMutationObserver
        ).listeners.filter((listener) => instanceListener !== listener);
      }),
    };
  }
}

export const makeMutationObserver = () => {
  class MutationObserver extends BaseMutationObserver {
    static listeners: ((entries: MutationRecord[]) => void)[] = [];
  }

  return MutationObserver as unknown as MutationObserverMock;
};
