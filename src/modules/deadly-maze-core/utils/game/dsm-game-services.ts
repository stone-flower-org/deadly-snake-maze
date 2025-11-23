import { MazeBodyManager, SnakeBodyManager } from '@/src/modules/deadly-maze-core/utils/bodies';
import { PlayerManager } from '@/src/modules/deadly-maze-core/utils/participants';
import { RapierPhysicsEngine } from '@/src/modules/deadly-maze-core/utils/physics-engine';
import { MazeSpaceManager } from '@/src/modules/deadly-maze-core/utils/spaces';

export interface IDSMGameServices {
  physicsEngine: RapierPhysicsEngine;
  playerManager: PlayerManager;
  mazeBodyManager: MazeBodyManager;
  mazeSpaceManager: MazeSpaceManager;
  snakeBodyManager: SnakeBodyManager;
}
