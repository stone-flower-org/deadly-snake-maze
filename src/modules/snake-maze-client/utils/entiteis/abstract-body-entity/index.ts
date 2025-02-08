import { type ITick } from '@stone-flower-org/js-utils';

import { AbstractEntity, IView } from '@/src/modules/common/utils/threejs';
import { BodyModel } from '@/src/modules/snake-maze-core/utils/store';

export interface IAbstractBodyEntityParams {
  view: IView;
}

export abstract class AbstractBodyEntity extends AbstractEntity {
  _view: IView;

  constructor({ view }: IAbstractBodyEntityParams) {
    super();
    this._view = view;
  }

  getView() {
    return this._view;
  }

  updateFromBodyModel(_0: ITick, _1: BodyModel) {
    //
  }
}
