import * as THREE from 'three';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';

import { AbstractResourceManager } from './abstract-resource-manager';
import { ICommonResource, ITypedCommonResource } from './resource';

export const BaseResourceTypes = {
  cubeTexture: 'cubeTexture',
  equirectangularTexture: 'equirectangularTexture',
  texture: 'texture',
  gltfModel: 'gltfModel',
} as const;

export interface ICubeTextureResource extends ICommonResource {
  type: typeof BaseResourceTypes.cubeTexture;
  path: [string, string, string, string, string, string];
}

export interface ITextureResource extends ICommonResource {
  type: typeof BaseResourceTypes.texture;
  path: string;
}

export interface IEquirectangularTextureResource extends ICommonResource {
  type: typeof BaseResourceTypes.equirectangularTexture;
  path: string;
}

export interface IGLTFModelResource extends ICommonResource {
  type: typeof BaseResourceTypes.gltfModel;
  path: string;
}

export type IBaseResource = ICubeTextureResource | ITextureResource | IGLTFModelResource;

export type IBaseResourceMap = {
  [BaseResourceTypes.cubeTexture]: THREE.CubeTexture;
  [BaseResourceTypes.texture]: THREE.Texture;
  [BaseResourceTypes.gltfModel]: GLTF;
  [BaseResourceTypes.equirectangularTexture]: THREE.DataTexture;
};

export class BaseResourceManager extends AbstractResourceManager<IBaseResourceMap> {
  readonly gltfLoader: GLTFLoader = new GLTFLoader();
  readonly rgbeLoader: RGBELoader = new RGBELoader();
  readonly textureLoader: THREE.TextureLoader = new THREE.TextureLoader();
  readonly cubeTextureLoader: THREE.CubeTextureLoader = new THREE.CubeTextureLoader();

  static create() {
    return new this();
  }

  async loadResource<T extends keyof IBaseResourceMap>(
    resource: ITypedCommonResource<T>,
  ): Promise<IBaseResourceMap[T] | undefined> {
    if (resource.type === BaseResourceTypes.cubeTexture)
      return this.loadCubeTexture(resource as ICubeTextureResource) as Promise<IBaseResourceMap[T]>;

    if (resource.type === BaseResourceTypes.texture)
      return this.loadTexture(resource as ITextureResource) as Promise<IBaseResourceMap[T]>;

    if (resource.type === BaseResourceTypes.gltfModel)
      return this.loadGLTFModel(resource as IGLTFModelResource) as Promise<IBaseResourceMap[T]>;

    if (resource.type === BaseResourceTypes.equirectangularTexture)
      return this.loadEquirectangularTexture(resource as IEquirectangularTextureResource) as Promise<
        IBaseResourceMap[T]
      >;
  }

  async loadCubeTexture(resource: ICubeTextureResource) {
    return this.cubeTextureLoader.loadAsync(resource.path);
  }

  async loadTexture(resource: ITextureResource) {
    return this.textureLoader.loadAsync(resource.path);
  }

  async loadGLTFModel(resource: IGLTFModelResource) {
    return this.gltfLoader.loadAsync(resource.path);
  }

  async loadEquirectangularTexture(resource: IEquirectangularTextureResource) {
    return this.rgbeLoader.loadAsync(resource.path);
  }
}
