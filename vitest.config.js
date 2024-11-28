const os = require('os');

const { configDefaults, defineConfig, mergeConfig } = require('vitest/config');

const viteConfig = require('./vite.config').default;

const workersCount = Math.max(1, os.cpus().length - 1);

export default mergeConfig(
  viteConfig(),
  defineConfig({
    test: {
      pool: 'forks',
      cache: false,
      css: false,
      clearMocks: true,
      coverage: {
        all: true,
        branches: 75,
        exclude: [...configDefaults.exclude, 'src/modules/tests/**'],
        functions: 80,
        include: ['src/**'],
        lines: 80,
        provider: 'v8',
        reportsDirectory: './report/coverage',
        statements: 75,
      },
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'src/modules/tests/**'],
      globals: true,
      globalSetup: './vitest-setup.js',
      maxConcurrency: workersCount,
      maxWorkers: workersCount,
      minWorkers: workersCount,
      retry: 1,
      sequence: {
        hooks: 'list',
      },
      setupFiles: ['src/modules/tests/setup'],
      testTimeout: 10000,
    },
  }),
);
