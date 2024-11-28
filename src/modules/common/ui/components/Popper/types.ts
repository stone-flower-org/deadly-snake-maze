import { Rect } from '@popperjs/core';

export type TetherOffset = ((params: { popper: Rect; reference: Rect; placement: string }) => number) | number;
