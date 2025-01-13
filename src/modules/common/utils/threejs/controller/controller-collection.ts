import { IController } from './controller';

export interface IControllerCollection extends IController {
  addControllers(items: IController[]): void;
  removeControllers(ids: IController['id'][]): void;
  deleteContollers(ids: IController['id'][]): void;
  getControllers(ids: IController['id'][]): IController[];
  getAllControllers(): IController[];
}

export interface IControllerCollectionOptions<T extends IController = IController> {
  controllers?: T[];
}
