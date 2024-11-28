import { Mock, vi } from 'vitest';

import {
  calcMaxScrollByX,
  calcMaxScrollByY,
  calcScrollLeftFromPercent,
  calcScrollTopFromPercent,
  getElementBoxFromHTMLElement,
  getScrolledPercentFromElementBox,
  scrollToByPercent,
} from './common';

const defaultElementBox = {
  clientHeight: 50,
  clientWidth: 100,
  offsetHeight: 100,
  offsetWidth: 200,
  scrollHeight: 1000,
  scrollLeft: 20,
  scrollTop: 10,
  scrollWidth: 2000,
};

const defaultHTMLElement = {
  ...defaultElementBox,
  scrollTo: vi.fn(),
} as unknown as HTMLElement;

afterEach(() => {
  (defaultHTMLElement.scrollTo as unknown as Mock).mockClear();
});

describe('calcMaxScrollByX', () => {
  it('should return max scroll width by x', () => {
    expect(calcMaxScrollByX(defaultElementBox)).toBe(1800);
  });
});

describe('calcMaxScrollByY', () => {
  it('should return max scroll height by y', () => {
    expect(calcMaxScrollByY(defaultElementBox)).toBe(900);
  });
});

describe('getElementBoxFromHTMLElement', () => {
  it('should return element box from HTML element', () => {
    expect(getElementBoxFromHTMLElement(defaultHTMLElement)).toEqual(defaultElementBox);
  });
});

describe('calcScrollLeftFromPercent', () => {
  describe.each([
    {
      name: '0%',
      element: defaultHTMLElement,
      scrolledPercent: 0,
      expectedResult: 0,
    },
    {
      name: '50%',
      element: defaultHTMLElement,
      scrolledPercent: 50,
      expectedResult: 900,
    },
    {
      name: '90%',
      element: defaultHTMLElement,
      scrolledPercent: 90,
      expectedResult: 1620,
    },
    {
      name: '100%',
      element: defaultHTMLElement,
      scrolledPercent: 100,
      expectedResult: 1800,
    },
  ])('should return scroll left value from scrolled percent', ({ name, element, scrolledPercent, expectedResult }) => {
    it(`${name}`, () => {
      expect(calcScrollLeftFromPercent(element, scrolledPercent)).toBe(expectedResult);
    });
  });
});

describe('calcScrollTopFromPercent', () => {
  describe.each([
    {
      name: '0%',
      element: defaultHTMLElement,
      scrolledPercent: 0,
      expectedResult: 0,
    },
    {
      name: '50%',
      element: defaultHTMLElement,
      scrolledPercent: 50,
      expectedResult: 450,
    },
    {
      name: '90%',
      element: defaultHTMLElement,
      scrolledPercent: 90,
      expectedResult: 810,
    },
    {
      name: '100%',
      element: defaultHTMLElement,
      scrolledPercent: 100,
      expectedResult: 900,
    },
  ])('should return scroll top value from scrolled percent', ({ name, element, scrolledPercent, expectedResult }) => {
    it(`${name}`, () => {
      expect(calcScrollTopFromPercent(element, scrolledPercent)).toBe(expectedResult);
    });
  });
});

describe('scrollToByPercent', () => {
  it('should call scrollTo with calculated scrollTop and scrollLeft from percents', () => {
    scrollToByPercent(defaultHTMLElement, {
      left: 90,
      top: 90,
    });
    expect(defaultHTMLElement.scrollTo).toHaveBeenCalledWith({
      left: 1620,
      top: 810,
    });
  });
});

describe('getScrolledPercentFromElementBox', () => {
  describe.each([
    {
      name: '1% 100%',
      elementBox: defaultElementBox,
      exlectedResult: {
        left: 1.1111111111111112,
        top: 100,
      },
    },
  ])('should return scolled pecents from element box', ({ name, elementBox, exlectedResult }) => {
    it(`${name}`, () => {
      expect(getScrolledPercentFromElementBox(elementBox)).toEqual(exlectedResult);
    });
  });
});
