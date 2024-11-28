import { useDispatch as useReduxDispatch } from 'react-redux';

import { DispatchFunc } from '@/src/modules/app/utils/store/types';

export const useDispatch: DispatchFunc = useReduxDispatch;
