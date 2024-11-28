import { ModifierArguments, Obj } from '@popperjs/core';
import { vi } from 'vitest';

import { MutationObserverMock } from '@/src/modules/tests/mocks';

import {
  makeArrowModifier,
  makeFlipModifier,
  makeOffsetModifier,
  makePreventOverflowModifier,
  makeUpdateOnResizeModifier,
} from './utils';

describe('makeOffsetModifier', () => {
  it('should return offset modifier with provided offset', () => {
    const offset = [1, 2];
    expect(makeOffsetModifier(offset)).toEqual({
      name: 'offset',
      options: {
        offset,
      },
    });
  });
});

describe('makeFlipModifier', () => {
  it('should return flip modifier with provided options', () => {
    const options = {};
    expect(makeFlipModifier(options)).toEqual({
      name: 'flip',
      options,
    });
  });
});

describe('makePreventOverflowModifier', () => {
  it('should return prevent overflow modifier with provided options', () => {
    const options = {};
    expect(makePreventOverflowModifier(options)).toEqual({
      name: 'preventOverflow',
      options,
    });
  });
});

describe('makeArrowModifier', () => {
  it('should return arrow modifier with provided options', () => {
    const options = {};
    expect(makeArrowModifier(options)).toEqual({
      name: 'arrow',
      options,
    });
  });
});

describe('makeUpdateOnResizeModifier', () => {
  it('should return update on resize modifier', () => {
    expect(makeUpdateOnResizeModifier()).toEqual(
      expect.objectContaining({
        name: 'updateOnResize',
        enabled: true,
        phase: 'main',
      }),
    );
  });

  it('should call instance update when popper element is resized', () => {
    const MutationObserverMock = global.MutationObserver as unknown as MutationObserverMock;
    const modifierArguments = {
      instance: {
        update: vi.fn(),
      },
      state: {
        elements: {
          popper: {},
        },
      },
    } as unknown as ModifierArguments<Obj>;

    const { effect } = makeUpdateOnResizeModifier();
    effect(modifierArguments);

    MutationObserverMock.emitIntersected([]);
    expect(modifierArguments.instance.update).toHaveBeenCalledTimes(1);
  });
});
