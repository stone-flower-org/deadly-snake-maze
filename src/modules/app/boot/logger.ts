import { ConsoleLogger, ServiceProvider } from '@stone-flower-org/js-app';

export const logger = new ConsoleLogger();

export const loggerProvider = ServiceProvider.create(logger);
