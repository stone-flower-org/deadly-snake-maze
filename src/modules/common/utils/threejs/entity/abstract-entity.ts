import { createAutoincrementIdGenerator, type ITick, WithEventProducer } from '@stone-flower-org/js-utils';

import { Object3DUtils } from '@/src/modules/common/utils/threejs/utils';

import { IEntity, IView } from './entity';

export abstract class AbstractEntity<V extends IView = IView>
  extends WithEventProducer(Function)
  implements IEntity<V>
{
  public readonly id: number;

  protected static _generateId = createAutoincrementIdGenerator();

  static get EVENTS() {
    return {
      delete: 'delete',
    };
  }

  constructor() {
    super();
    this.id = this._generateId();
  }

  async init() {
    //
  }

  update(_: ITick) {
    //
  }

  delete() {
    this._eventBus.emit(AbstractEntity.EVENTS.delete, this);
    Object3DUtils.instance().deleteObject(this.getView());
  }

  abstract getView(): V;

  protected _generateId(): number {
    return AbstractEntity._generateId();
  }
}
