#include <common>

vec2 projectToSurface(vec3 worldPos, vec3 normal) {
    // Find the best projection axis: choose the most stable two axes
    vec3 tangent, bitangent;
    
    if (abs(normal.y) > abs(normal.x) && abs(normal.y) > abs(normal.z)) {
        // If normal is mostly facing up/down, use XZ plane
        tangent = vec3(1, 0, 0);
        bitangent = vec3(0, 0, 1);
    } else if (abs(normal.x) > abs(normal.z)) {
        // If normal is mostly facing sideways, use YZ plane
        tangent = vec3(0, 1, 0);
        bitangent = vec3(0, 0, 1);
    } else {
        // Otherwise, use XY plane
        tangent = vec3(1, 0, 0);
        bitangent = vec3(0, 1, 0);
    }

    // Project world position onto the chosen plane
    float u = dot(worldPos, tangent);
    float v = dot(worldPos, bitangent);

    return vec2(u, v);
}
