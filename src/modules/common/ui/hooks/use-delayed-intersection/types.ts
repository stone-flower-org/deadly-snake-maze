export interface UseDelayedIntersectionParams<EP extends unknown[] = unknown[], LP extends unknown[] = unknown[]> {
  enterDelay?: number;
  initIntersected?: boolean;
  leaveDelay?: number;
  onEnter?: (...params: EP) => void;
  onLeave?: (...params: LP) => void;
}
