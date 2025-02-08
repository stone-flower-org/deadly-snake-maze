import type RAPIER from '@dimforge/rapier3d';

export enum ShapeType {
  Ball = 0,
  Cuboid = 1,
  Capsule = 2,
  Segment = 3,
  Polyline = 4,
  Triangle = 5,
  TriMesh = 6,
  HeightField = 7,
  ConvexPolyhedron = 9,
  Cylinder = 10,
  Cone = 11,
  RoundCuboid = 12,
  RoundTriangle = 13,
  RoundCylinder = 14,
  RoundCone = 15,
  RoundConvexPolyhedron = 16,
  HalfSpace = 17,
}

export const isBallShape = (shape: RAPIER.Shape): shape is RAPIER.Ball => shape.type === ShapeType.Ball;

export const isCuboidShape = (shape: RAPIER.Shape): shape is RAPIER.Cuboid => shape.type === ShapeType.Cuboid;

export const isCapsuleShape = (shape: RAPIER.Shape): shape is RAPIER.Capsule => shape.type === ShapeType.Capsule;

export const isSegmentShape = (shape: RAPIER.Shape): shape is RAPIER.Segment => shape.type === ShapeType.Segment;

export const isPolylineShape = (shape: RAPIER.Shape): shape is RAPIER.Polyline => shape.type === ShapeType.Polyline;

export const isTriangleShape = (shape: RAPIER.Shape): shape is RAPIER.Triangle => shape.type === ShapeType.Triangle;

export const isTriMeshShape = (shape: RAPIER.Shape): shape is RAPIER.TriMesh => shape.type === ShapeType.TriMesh;

export const isConvexPolyhedronShape = (shape: RAPIER.Shape): shape is RAPIER.ConvexPolyhedron =>
  shape.type === ShapeType.ConvexPolyhedron;

export const isCylinderShape = (shape: RAPIER.Shape): shape is RAPIER.Cylinder => shape.type === ShapeType.Cylinder;

export const isConeShape = (shape: RAPIER.Shape): shape is RAPIER.Cone => shape.type === ShapeType.Cone;

export const isRoundCuboidShape = (shape: RAPIER.Shape): shape is RAPIER.RoundCuboid =>
  shape.type === ShapeType.RoundCuboid;

export const isRoundTriangleShape = (shape: RAPIER.Shape): shape is RAPIER.RoundTriangle =>
  shape.type === ShapeType.RoundTriangle;

export const isRoundCylinderShape = (shape: RAPIER.Shape): shape is RAPIER.RoundCylinder =>
  shape.type === ShapeType.RoundCylinder;

export const isRoundConeShape = (shape: RAPIER.Shape): shape is RAPIER.RoundCone => shape.type === ShapeType.RoundCone;

export const isRoundConvexPolyhedronShape = (shape: RAPIER.Shape): shape is RAPIER.RoundConvexPolyhedron =>
  shape.type === ShapeType.RoundConvexPolyhedron;

export const isHalfSpaceShape = (shape: RAPIER.Shape): shape is RAPIER.HalfSpace => shape.type === ShapeType.HalfSpace;

export const getCubeFromShape = (shape: RAPIER.Shape) => {
  const error = (shape: RAPIER.Shape) => new Error(`Can not get box from ${shape.type} shape`);
  const cube = [0, 0, 0] as [number, number, number];

  if (isBallShape(shape)) {
    cube[0] = shape.radius;
    cube[1] = shape.radius;
    cube[2] = shape.radius;
    return cube;
  }

  if (
    isConeShape(shape) ||
    isRoundConeShape(shape) ||
    isCylinderShape(shape) ||
    isCapsuleShape(shape) ||
    isRoundCylinderShape(shape) ||
    isRoundConeShape(shape)
  ) {
    cube[0] = shape.radius;
    cube[1] = shape.halfHeight * 2;
    cube[2] = shape.radius;
    return cube;
  }

  if (isCuboidShape(shape) || isRoundCuboidShape(shape)) {
    cube[0] = shape.halfExtents.x * 2;
    cube[1] = shape.halfExtents.y * 2;
    cube[2] = shape.halfExtents.z * 2;
    return cube;
  }

  throw error(shape);
};

export const getCubeFromShapeSafe = (shape: RAPIER.Shape, def = [1, 1, 1] as const) => {
  try {
    return getCubeFromShape(shape);
  } catch (e) {
    console.warn(e);
    return def;
  }
};
