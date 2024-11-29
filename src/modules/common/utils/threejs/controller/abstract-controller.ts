import { WithEventProducer } from '@/src/modules/common/utils/threejs/event-producer';

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
    this.emit(AbstractController.EVENTS.delete, this);
  }

  protected _generateId(): string {
    return this.constructor.name;
  }
}
