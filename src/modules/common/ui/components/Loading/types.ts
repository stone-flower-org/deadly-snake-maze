import { CSSProperties } from 'react';

import { LOADING_SIZES } from './constants';

export type LoadingSize = CSSProperties['width'] | keyof typeof LOADING_SIZES;
