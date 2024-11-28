import { isKeyOf } from '@stone-flower-org/js-utils';

import { LOADING_SIZES } from './constants';

export const calcSize = (size: string | number) => (isKeyOf(LOADING_SIZES, size) ? LOADING_SIZES[size] : size);
