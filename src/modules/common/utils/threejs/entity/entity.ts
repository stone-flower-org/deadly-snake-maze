import { type IEventProducer } from '@stone-flower-org/js-utils';
import * as THREE from 'three';

import { type IAnimated } from '@/src/modules/common/utils/threejs/animated';

export type IView = THREE.Object3D;

export interface IEntity<V extends IView = IView> extends IAnimated, IEventProducer {
  readonly id: number;
  init(): Promise<void>;
  getView(): V;
  delete(): void;
}
