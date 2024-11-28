import { vi } from 'vitest';

export const makeResizeObeserver = () =>
  vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));
