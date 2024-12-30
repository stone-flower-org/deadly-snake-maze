import { type ICollection } from '@stone-flower-org/js-utils';

import { IController } from './controller';

export interface IControllerCollection<T extends IController = IController> extends ICollection<T, T['id']> {
  addControllers(items: T[]): void;
  removeControllers(ids: T['id'][]): void;
  deleteContollers(ids: T['id'][]): void;
  getControllers(ids: T['id'][]): T[];
  getAllControllers(): T[];
}

export interface IControllerCollectionOptions<T extends IController = IController> {
  controllers?: T[];
}
