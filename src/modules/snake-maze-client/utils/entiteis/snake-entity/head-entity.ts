import * as THREE from 'three';

import { SceneRenderer } from '@/src/modules/snake-maze-client/utils/scene-renderer';
import { BodyAtom } from '@/src/modules/snake-maze-core/utils/store';
import { AbstractBodyEntity } from '@/src/modules/snake-maze-client/utils/entiteis/abstract-body-entity';
import { BodyAtomSync } from '@/src/modules/snake-maze-client/utils/entiteis/utils';
import { ITick } from '@stone-flower-org/js-utils';

export class HeadEntity extends AbstractBodyEntity<BodyAtom> {
  protected _sync = new BodyAtomSync();

  static get OPTIONS() {
    return {
      geometry: {
        segmentsDensity: 5,
      }
    };
  }

  static factory(_: SceneRenderer) {
    // TODO: write me
  }

  updateFromBody(tick: ITick, body: BodyAtom): void {
    // TODO: write me
  }
}
