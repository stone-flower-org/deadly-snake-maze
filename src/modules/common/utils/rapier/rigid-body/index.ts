import { type RigidBody, type Collider } from '@dimforge/rapier3d';

export const forEachColliderFromRigidBody = (body: RigidBody, callback: (collider: Collider) => boolean | void) => {
  const colliders = body.numColliders();

  for (let i = 0; i < colliders; i++) {
    const stop = callback(body.collider(i));
    if (stop) break;
  }
};

export const getCollidersFromRigidBody = (rigidBody: RigidBody) => {
  const colliders: Collider[] = [];

  forEachColliderFromRigidBody(rigidBody, (collider) => {
    colliders.push(collider);
  });

  return colliders;
};
