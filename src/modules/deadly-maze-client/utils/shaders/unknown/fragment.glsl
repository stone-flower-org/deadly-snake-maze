#include ../common/common.glsl

// Material
uniform vec3 uColor;
uniform float uCellSize;

varying vec3 vModelPosition;
varying vec3 vModelNormal;

void main() {
    float cellSize = uCellSize;
    vec3 color = uColor;

    // Get stable 2D coordinates based on surface normal
    vec2 normalizedUv = projectToSurface(vModelPosition, vModelNormal) / uCellSize;

    float pattern = step(mod(normalizedUv.x, 1.0) + mod(normalizedUv.y, 1.0), 1.0);

    color *= pattern;

    gl_FragColor = vec4(color, 1.0);
}