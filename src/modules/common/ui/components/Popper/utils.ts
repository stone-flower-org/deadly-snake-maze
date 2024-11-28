import { ModifierArguments, ModifierPhases, Obj, Padding } from '@popperjs/core';

import { TetherOffset } from './types';

export const makeOffsetModifier = (offset: number[]) => ({
  name: 'offset',
  options: {
    offset,
  },
});

export const makeFlipModifier = (options: { fallbackPlacements?: string[] } = {}) => ({
  name: 'flip',
  options,
});

export const makePreventOverflowModifier = (
  options: {
    boundary?: Element;
    tether?: boolean;
    tetherOffset?: TetherOffset;
    padding?: number;
  } = {},
) => ({
  name: 'preventOverflow',
  options,
});

export const makeArrowModifier = (options: { element?: Element; padding?: Padding }) => ({
  name: 'arrow',
  options,
});

export const makeUpdateOnResizeModifier = () => ({
  name: 'updateOnResize',
  enabled: true,
  phase: 'main' as ModifierPhases,
  effect: ({ state, instance }: ModifierArguments<Obj>) => {
    const popper = state.elements.popper as Element;

    const observer = new MutationObserver(() => {
      instance.update();
    });

    observer.observe(popper, {
      attributeFilter: ['style', 'class'],
      attributes: true,
      characterData: false,
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
    };
  },
  fn: () => undefined,
});
