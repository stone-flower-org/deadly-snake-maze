import { Box3, BufferGeometry, Material, Mesh, Object3D, Vector3 } from 'three';

export type ObjectWithMaterial<O extends Object3D = Object3D, M extends Material = Material> = O & {
  material: M | M[];
};

export class Object3DUtils {
  protected static _instance?: Object3DUtils;

  static instance() {
    if (!this._instance) {
      this._instance = new this();
    }
    return this._instance;
  }

  disposeMaterial(material: Material | Material[]) {
    const materials = Array.isArray(material) ? material : [material];
    materials.forEach((material) => {
      material.dispose();
    });
  }

  setMaterial(object: Object3D | Object3D[], material: Material) {
    const objects = Array.isArray(object) ? object : [object];
    objects.forEach((object) => {
      if ('material' in object) {
        this.disposeMaterial(object.material as Material | Material[]);
        object.material = material;
        material.needsUpdate = true;
      }
    });
  }

  updateMaterial<M extends Material>(
    object: ObjectWithMaterial<Object3D, M> | ObjectWithMaterial<Object3D, M>[],
    update: (material: M) => void,
  ) {
    const objects = Array.isArray(object) ? object : [object];
    objects.forEach((object) => {
      const materials = Array.isArray(object.material) ? object.material : [object.material];
      materials.forEach((material) => {
        update(material);
      });
    });
  }

  setGeometry(object: Object3D | Object3D[], geometry: BufferGeometry) {
    const objects = Array.isArray(object) ? object : [object];
    objects.forEach((object) => {
      if ('geometry' in object) {
        (object.geometry as BufferGeometry).dispose();
        object.geometry = geometry;
      }
    });
  }

  deleteMesh(object: Mesh) {
    object.children.forEach(this.deleteObject);

    object.geometry.dispose();
    this.disposeMaterial(object.material);
    object.clear();
    object.removeFromParent();
  }

  deleteObject(object: Object3D) {
    if (this.isMesh(object)) {
      this.deleteMesh(object);
      return;
    }

    object.children.forEach(this.deleteObject);
    object.clear();
    object.removeFromParent();
  }

  isMesh(object: Object3D): object is Mesh {
    return object instanceof Mesh;
  }

  getObjectSize(object: Object3D) {
    const box = new Box3().setFromObject(object);
    const size = new Vector3();
    box.getSize(size);
    return size;
  }
}
