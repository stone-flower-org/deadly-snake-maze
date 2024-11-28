import { useSelector as useReduxSelector } from 'react-redux';

import { SelectorFunc } from '@/src/modules/app/utils/store/types';

export const useSelector: SelectorFunc = useReduxSelector;
