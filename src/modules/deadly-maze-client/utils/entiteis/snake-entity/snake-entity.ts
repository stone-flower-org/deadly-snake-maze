import { ITick } from '@stone-flower-org/js-utils';
import * as THREE from 'three';

import { Rapier3D } from '@/src/modules/common/utils/rapier';
import {
  AbstractBodyEntity,
  IAbstractBodyEntityParams,
} from '@/src/modules/deadly-maze-client/utils/entiteis/abstract-body-entity';
import { BodyModelSync, IBodySync } from '@/src/modules/deadly-maze-client/utils/entiteis/utils';
import { unknownMaterial } from '@/src/modules/deadly-maze-client/utils/materials';
import { SceneRenderer } from '@/src/modules/deadly-maze-client/utils/scene-renderer';
import { SnakeBody } from '@/src/modules/deadly-maze-core/utils/bodies';
import { BodyAtom } from '@/src/modules/deadly-maze-core/utils/store';

import { BodyEntity } from './body-entityy';
import { HeadEntity } from './head-entity';
import { TailEntity } from './tail-entityy';

export interface ISnakeEntityParams extends IAbstractBodyEntityParams {
  sync: IBodySync;
}

export class SnakeEntity extends AbstractBodyEntity<SnakeBody> {
  protected _sync: IBodySync;

  static registerEntity(sceneRenderer: SceneRenderer) {
    // TODO: rewrite me after balls are wrapped with TubeGeometry

    let geometry: THREE.SphereGeometry | undefined;

    const ballFactory = (atom: BodyAtom) => {
      const ball = atom.getCollider().shape as Rapier3D.Ball;

      const r = ball.radius;

      if (!geometry) {
        geometry = new THREE.SphereGeometry(r);
      }

      const view = new THREE.Mesh(geometry, unknownMaterial);

      return new BodyEntity({ bodyId: atom.getId(), view });
    };

    sceneRenderer
      .getEntityMap()
      .set(SnakeBody.name, this.factory(sceneRenderer))
      .set(SnakeBody.ATOMS.head.type, ballFactory)
      .set(SnakeBody.ATOMS.body.type, ballFactory)
      .set(SnakeBody.ATOMS.tail.type, ballFactory);
  }

  static factory(sceneRenderer: SceneRenderer) {
    // TODO: write body using TubeGeometry (kind of wrap balls of the body)
    return (body: SnakeBody) =>
      new SnakeEntity({
        bodyId: body.getId(),
        sync: new BodyModelSync({ sceneRenderer }),
      });
  }

  constructor({ sync, ...rest }: ISnakeEntityParams) {
    super(rest);
    this._sync = sync;
  }

  updateFromBody(tick: ITick, body: SnakeBody) {
    this._sync.sync(tick, this, body);
  }
}
