#include ../common/common.glsl

varying vec3 vModelPosition;
varying vec3 vModelNormal;

void main()
{
    /**
     * Model Position
     */
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    /**
     * View Position
     */
    vec4 viewPosition = viewMatrix * modelPosition;

    /*
     * Projection Position
     */ 
    vec4 projectionPosition = projectionMatrix * viewPosition;

    /*
     * Out
     */
    gl_Position = projectionPosition;

    /*
     * Varying
     */
    vModelPosition = modelPosition.xyz;
    vModelNormal = normalize(mat3(modelMatrix) * normal);
}
