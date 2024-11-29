import * as THREE from 'three';

import { StaticEntity } from '@/src/modules/common/utils/threejs/entities';
import { IEntity } from '@/src/modules/common/utils/threejs/entity';

export type ICameraView = THREE.Camera | THREE.CubeCamera;

export interface ICamera<C extends ICameraView = ICameraView> extends IEntity<C> {
  isRenderableCamera(): this is ICamera<THREE.Camera>;
  isCubeCamera(): this is ICamera<THREE.CubeCamera>;
  isPerspectiveCamera(): this is ICamera<THREE.PerspectiveCamera>;
  setParams(params: IPerspectiveCameraParams): void;
}

export interface IPerspectiveCameraParams {
  fov?: number;
  aspect?: number;
  near?: number;
  far?: number;
}

export interface ICameraOptions<C extends ICameraView = ICameraView> extends IPerspectiveCameraParams {
  camera: C;
}

export class Camera<C extends ICameraView = ICameraView> extends StaticEntity<C> implements ICamera<C> {
  static createCamera<C extends ICameraView = ICameraView>(options: ICameraOptions<C>) {
    return new this(options);
  }

  protected constructor({ camera, ...params }: ICameraOptions<C>) {
    super({ view: camera });
    this.setParams(params);
  }

  isRenderableCamera(): this is ICamera<THREE.Camera> {
    const camera = this._view;
    return 'isCamera' in camera && camera.isCamera;
  }

  isCubeCamera(): this is ICamera<THREE.CubeCamera> {
    const camera = this._view;
    return camera.type === 'CubeCamera';
  }

  isPerspectiveCamera(): this is ICamera<THREE.PerspectiveCamera> {
    const camera = this._view;
    return camera.type === 'PerspectiveCamera';
  }

  setParams(params: IPerspectiveCameraParams) {
    if (this.isPerspectiveCamera()) {
      const camera = this.getView() as unknown as THREE.PerspectiveCamera;
      params.aspect && (camera.aspect = params.aspect);
      params.far && (camera.far = params.far);
      params.fov && (camera.fov = params.fov);
      camera.updateProjectionMatrix();
    }
  }
}
