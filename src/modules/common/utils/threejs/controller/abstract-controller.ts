import { WithEventProducer } from '@stone-flower-org/js-utils';

import { IController } from './controller';

export abstract class AbstractController extends WithEventProducer(Function) implements IController {
  public readonly id: string;

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

  delete() {
    this._eventBus.emit(AbstractController.EVENTS.delete, this);
    this._eventBus.removeAllListeners();
  }

  protected _generateId(): string {
    return this.constructor.name;
  }
}
