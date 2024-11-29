import { createContextSaver } from '@stone-flower-org/js-utils';

import { Collection, ICollection } from '@/src/modules/common/utils/threejs/utils';

import { AbstractController } from './abstract-controller';
import { IController } from './controller';
import { IControllerCollectionOptions } from './controller-collection';

export class AbstractControllerCollection<T extends IController = IController> extends AbstractController {
  protected _items: ICollection<T, T['id']>;
  protected _binder = createContextSaver(this);

  constructor({ controllers }: IControllerCollectionOptions<T>) {
    super();
    this._items = new Collection<T, T['id']>({
      idGetter: (item: T) => item.id,
      items: controllers,
    });
  }

  addControllers(controllers: T[]) {
    controllers.forEach((controller) => {
      controller.on(AbstractController.EVENTS.delete, this._binder.useFunc(this._onContollerDelete));
      this._items.add([controller]);
    });
  }

  removeControllers(ids: T['id'][]) {
    ids.forEach((id) => {
      const item = this._items.get([id])[0];
      if (!item) return;
      item.off(AbstractController.EVENTS.delete, this._binder.useFunc(this._onContollerDelete));
      this._items.delete([item.id]);
    });
  }

  deleteContollers(ids: T['id'][]) {
    ids.forEach((id) => {
      const item = this._items.get([id])[0];
      if (!item) return;
      item.delete();
    });
  }

  getControllers(ids: T['id'][]) {
    return this._items.get(ids);
  }

  getAllControllers() {
    return this._items.getAll();
  }

  async init() {
    await Promise.all(this.getAllControllers().map((controller) => controller.init()));
  }

  delete() {
    super.delete();
    this.deleteContollers(this.getAllControllers().map((item) => item.id));
  }

  protected _onContollerDelete(controller: T) {
    this.removeControllers([controller.id]);
  }
}
