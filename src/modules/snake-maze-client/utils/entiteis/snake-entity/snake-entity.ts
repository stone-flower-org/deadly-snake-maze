import * as THREE from 'three';
import { ITick } from '@stone-flower-org/js-utils';

import { AbstractBodyEntity, IAbstractBodyEntityParams } from '@/src/modules/snake-maze-client/utils/entiteis/abstract-body-entity';
import { SnakeBody } from '@/src/modules/snake-maze-core/utils/bodies';
import { SceneRenderer } from '@/src/modules/snake-maze-client/utils/scene-renderer';
import { BodyModelSync, IBodySync } from '@/src/modules/snake-maze-client/utils/entiteis/utils';
import { BodyAtom } from '@/src/modules/snake-maze-core/utils/store';
import { Rapier3D } from '@/src/modules/common/utils/rapier';
import { unknownMaterial } from '@/src/modules/snake-maze-client/utils/materials';

import { HeadEntity } from './head-entity';
import { BodyEntity } from './body-entityy';
import { TailEntity } from './tail-entityy';

export interface IMazeEntityParams extends IAbstractBodyEntityParams {
  sync: IBodySync;
}

export class MazeEntity extends AbstractBodyEntity<SnakeBody> {
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

    sceneRenderer.getEntityMap()
      .set(SnakeBody.name, this.factory(sceneRenderer))
      .set(SnakeBody.ATOMS.head.type, ballFactory)
      .set(SnakeBody.ATOMS.body.type, ballFactory)
      .set(SnakeBody.ATOMS.tail.type, ballFactory);
  }

  static factory(sceneRenderer: SceneRenderer) {
    // TODO: write body using TubeGeometry (kind of wrap balls of the body)
    return (body: SnakeBody) => new MazeEntity({
      bodyId: body.getId(),
      sync: new BodyModelSync({ sceneRenderer }),
    })
  }

  constructor({ sync, ...rest }: IMazeEntityParams) {
    super(rest);
    this._sync = sync;
  }

  updateFromBody(tick: ITick, body: SnakeBody) {
    this._sync.sync(tick, this, body);
  }
}
