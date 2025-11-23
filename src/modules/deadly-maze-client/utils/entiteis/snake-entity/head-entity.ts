import { ITick } from '@stone-flower-org/js-utils';
import * as THREE from 'three';

import { AbstractBodyEntity } from '@/src/modules/deadly-maze-client/utils/entiteis/abstract-body-entity';
import { BodyAtomSync } from '@/src/modules/deadly-maze-client/utils/entiteis/utils';
import { SceneRenderer } from '@/src/modules/deadly-maze-client/utils/scene-renderer';
import { BodyAtom } from '@/src/modules/deadly-maze-core/utils/store';

export class HeadEntity extends AbstractBodyEntity<BodyAtom> {
  protected _sync = new BodyAtomSync();

  static get OPTIONS() {
    return {
      geometry: {
        segmentsDensity: 5,
      },
    };
  }

  static factory(_: SceneRenderer) {
    // TODO: write me
  }

  updateFromBody(tick: ITick, body: BodyAtom): void {
    // TODO: write me
  }
}
