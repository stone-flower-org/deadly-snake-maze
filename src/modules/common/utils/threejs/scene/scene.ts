import * as THREE from 'three';

import { IAnimated } from '@/src/modules/common/utils/threejs/animated';
import { ICamera } from '@/src/modules/common/utils/threejs/camera';
import { IEntity, IEntityCollection } from '@/src/modules/common/utils/threejs/entity';

export type ISceneView = THREE.Scene;

export interface IScene<C extends ICamera = ICamera> extends IAnimated {
  readonly id: number;
  init(): Promise<void>;
  getCamera(): C | undefined;
  getEntitiesCollection(): IEntityCollection;
  getView(): ISceneView;
  clear(): void;
  delete(): void;
}

export interface ISceneOptions {
  entities: IEntity[];
  scene: ISceneView;
}

export type IRenderableScene = IScene<ICamera<THREE.Camera>>;
