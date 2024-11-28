import { IGNORED_ERRORS_NAMES_SET } from './constants';

export const shouldHandleError = (error: Error) => !IGNORED_ERRORS_NAMES_SET.has(error.name);
