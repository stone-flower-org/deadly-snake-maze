import { type ITick } from '@stone-flower-org/js-utils';

import { EntityGroup, IView } from '@/src/modules/common/utils/threejs';

export interface IAbstractBodyEntityParams {
  view?: IView
  bodyId: number;
}

export abstract class AbstractBodyEntity<B = unknown> extends EntityGroup {
  protected _bodyId: number;

  constructor({ bodyId, ...rest }: IAbstractBodyEntityParams) {
    super(rest);
    this._bodyId = bodyId;
  }

  getBodyId() {
    return this._bodyId;
  }

  update(_: ITick): void {
    // TODO: skip update
  }

  abstract updateFromBody(tick: ITick, body: B): void;
}
