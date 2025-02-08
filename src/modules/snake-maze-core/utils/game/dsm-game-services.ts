import { MazeBodyManager, SnakeBodyManager } from '@/src/modules/snake-maze-core/utils/bodies';
import { PlayerManager } from '@/src/modules/snake-maze-core/utils/participants';
import { RapierPhysicsEngine } from '@/src/modules/snake-maze-core/utils/physics-engine';
import { MazeSpaceManager } from '@/src/modules/snake-maze-core/utils/spaces';

export interface IDSMGameServices {
  physicsEngine: RapierPhysicsEngine;
  playerManager: PlayerManager;
  mazeBodyManager: MazeBodyManager;
  mazeSpaceManager: MazeSpaceManager;
  snakeBodyManager: SnakeBodyManager;
}
