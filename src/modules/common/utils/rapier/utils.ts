export const eulerToQuaternion = ({ x, y, z }: { x: number; y: number; z: number }) => {
  const cx = Math.cos(x / 2);
  const cy = Math.cos(y / 2);
  const cz = Math.cos(z / 2);
  const sx = Math.sin(x / 2);
  const sy = Math.sin(y / 2);
  const sz = Math.sin(z / 2);

  return {
    x: sx * cy * cz + cx * sy * sz,
    y: cx * sy * cz - sx * cy * sz,
    z: cx * cy * sz + sx * sy * cz,
    w: cx * cy * cz - sx * sy * sz,
  };
};

export const quaternionToEuler = ({ x, y, z, w }: { x: number; y: number; z: number; w: number }) => {
  // Roll (X-axis rotation)
  const sinrCosp = 2 * (w * x + y * z);
  const cosrCosp = 1 - 2 * (x * x + y * y);
  const roll = Math.atan2(sinrCosp, cosrCosp);

  // Pitch (Y-axis rotation)
  const sinp = 2 * (w * y - z * x);
  let pitch;
  if (Math.abs(sinp) >= 1) {
    pitch = (Math.sign(sinp) * Math.PI) / 2;
  } else {
    pitch = Math.asin(sinp);
  }

  // Yaw (Z-axis rotation)
  const sinyCosp = 2 * (w * z + x * y);
  const cosyCosp = 1 - 2 * (y * y + z * z);
  const yaw = Math.atan2(sinyCosp, cosyCosp);

  return { x: roll, y: pitch, z: yaw };
};
