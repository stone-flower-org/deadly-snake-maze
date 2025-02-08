import { type RigidBody, type Collider } from '@dimforge/rapier3d';

export const forEachColliderFromRigidBody = (body: RigidBody, callback: (collider: Collider) => void) => {
  const colliders = body.numColliders();

  for (let i = 0; i < colliders; i++) {
    callback(body.collider(i));
  }
};

export const getCollidersFromRigidBody = (rigidBody: RigidBody) => {
  const colliders: Collider[] = [];

  forEachColliderFromRigidBody(rigidBody, (collider) => {
    colliders.push(collider);
  });

  return colliders;
};
