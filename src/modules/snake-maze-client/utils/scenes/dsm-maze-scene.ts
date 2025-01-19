import * as THREE from 'three';

import { StaticEntity } from '@/src/modules/common/utils/threejs';

import { AbstractDSMScene, IDSMSceneOptions } from './abstract-dsm-scene';

export class DSMMazeScene extends AbstractDSMScene {
  static async create(options: IDSMSceneOptions) {
    return new this(options);
  }

  constructor(options: IDSMSceneOptions) {
    super(options);
  }

  async init() {
    await super.init();

    this._camera.getView().position.set(1.5, 1.5, 1); // TODO: update me
    this._camera.getView().lookAt(new THREE.Vector3(0, 0, 0));

    this.addCube();
  }

  addCube() {
    // TODO: update me
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0, 0);
    this._entities.addEntities([StaticEntity.createEntity({ view: mesh })]);
  }
}
