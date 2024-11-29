import { IAnimated } from './animated';

export type IWithAnimated<T = object> = IAnimated & T;
