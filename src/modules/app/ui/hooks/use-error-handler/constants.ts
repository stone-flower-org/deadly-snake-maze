export const DEFAULT_ALERT_ERROR_TITLE = 'Unexpected error';

export const IGNORED_ERRORS: Error[] = [];

export const IGNORED_ERRORS_NAMES_SET = new Set(IGNORED_ERRORS.map((e) => e.name));
