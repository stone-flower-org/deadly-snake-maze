import 'vitest';

declare module 'vitest' {
  export interface ProvidedContext {
    CONFIGS: {
      APP_LOCALE: string;
      APP_TZ: string;
    };
  }
}
