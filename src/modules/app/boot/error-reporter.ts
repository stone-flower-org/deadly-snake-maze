import { LoggerErrorReporter, ServiceProvider } from '@stone-flower-org/js-app';

import { logger } from './logger';

export const errorReporter = new LoggerErrorReporter(logger);

export const errorReporterProvider = ServiceProvider.create(errorReporter);
