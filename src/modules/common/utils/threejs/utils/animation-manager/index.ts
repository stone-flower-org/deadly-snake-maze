import * as THREE from 'three';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

import { ITick } from '@/src/modules/common/utils/threejs/time';

export type Animations = Record<string, THREE.AnimationAction>;

export interface IAnimationPlayOptions {
  fadeDuration?: number;
}

export interface IAnimationManager<A extends Animations = Animations> {
  play(name: keyof A, options?: IAnimationPlayOptions): void;
  update(tick: ITick): void;
  stop(): void;
}

export interface IAnimationManagerOptions<A extends Animations = Animations> {
  animations: A;
  mixer: THREE.AnimationMixer;
}

export class AnimationManager<A extends Animations = Animations> implements IAnimationManager<A> {
  private _animations: A;
  private _mixer: THREE.AnimationMixer;
  private _currentAnimation?: THREE.AnimationAction;

  static createFromModel(model: GLTF) {
    const animations: Animations = {};

    const mixer = new THREE.AnimationMixer(model.scene);

    model.animations.forEach((clip) => {
      animations[clip.name] = mixer.clipAction(clip);
    });

    return new this({ animations, mixer });
  }

  constructor({ animations, mixer }: IAnimationManagerOptions<A>) {
    this._animations = animations;
    this._mixer = mixer;
  }

  play(name: keyof A, { fadeDuration }: IAnimationPlayOptions = {}) {
    const current = this._animations[name];
    const prev = this._currentAnimation;

    current.reset();
    current.play();

    prev && current.crossFadeFrom(prev, fadeDuration ?? 1, true);
    this._currentAnimation = current;
  }

  stop(fadeOut = 1) {
    this._currentAnimation?.fadeOut(fadeOut);
  }

  update(tick: ITick) {
    this._mixer.update(tick.deltaTime);
  }
}
