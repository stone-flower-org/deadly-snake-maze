import * as THREE from 'three';

export interface ICursor {
  position: THREE.Vector2Like;
  mousedown: boolean;
}
