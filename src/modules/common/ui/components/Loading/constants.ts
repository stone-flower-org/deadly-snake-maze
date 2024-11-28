export const LOADING_SIZES = {
  small: '1rem',
  medium: '2rem',
  large: '3.5rem',
};

export const DEFAULT_PROPS = {
  'data-test-id': 'loading',
  color: 'primary',
  role: 'status',
  size: LOADING_SIZES.medium,
  title: 'Loading',
} as const;
