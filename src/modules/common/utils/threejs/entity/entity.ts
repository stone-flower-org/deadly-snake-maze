import * as THREE from 'three';

import { IAnimated } from '@/src/modules/common/utils/threejs/animated';
import { IEventProducer } from '@/src/modules/common/utils/threejs/event-producer';

export type IView = THREE.Object3D;

export interface IEntity<V extends IView = IView> extends IAnimated, IEventProducer {
  readonly id: number;
  init(): Promise<void>;
  getView(): V;
  delete(): void;
}
