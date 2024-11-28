import { ElementBox, ScrolledPercent } from '@/src/modules/common/utils/react/types';

export const calcMaxScrollByX = ({ scrollWidth, offsetWidth }: ElementBox) => scrollWidth - offsetWidth;

export const calcMaxScrollByY = ({ offsetHeight, scrollHeight }: ElementBox) => scrollHeight - offsetHeight;

export const getElementBoxFromHTMLElement = (element: HTMLElement): ElementBox => ({
  clientHeight: element.clientHeight,
  clientWidth: element.clientWidth,
  offsetHeight: element.offsetHeight,
  offsetWidth: element.offsetWidth,
  scrollHeight: element.scrollHeight,
  scrollLeft: element.scrollLeft,
  scrollTop: element.scrollTop,
  scrollWidth: element.scrollWidth,
});

export const calcScrollLeftFromPercent = (element: ElementBox, scrolledPercent: number) => {
  const maxScroll = calcMaxScrollByX(element);
  return Math.min((scrolledPercent / 100) * maxScroll, maxScroll);
};

export const calcScrollTopFromPercent = (element: ElementBox, scrolledPercent: number) => {
  const maxScroll = calcMaxScrollByY(element);
  return Math.min((scrolledPercent / 100) * maxScroll, maxScroll);
};

export const scrollToByPercent = (element: HTMLElement, { left, top }: { left?: number; top?: number }) => {
  const elementBox = getElementBoxFromHTMLElement(element);
  const scrollLeft = left !== undefined ? calcScrollLeftFromPercent(elementBox, left) : undefined;
  const scrollTop = top !== undefined ? calcScrollTopFromPercent(elementBox, top) : undefined;
  element.scrollTo({
    left: scrollLeft,
    top: scrollTop,
  });
};

export const getScrolledPercentFromElementBox = (elementBox: ElementBox): ScrolledPercent => {
  const availableXScroll = calcMaxScrollByX(elementBox);
  const availableYScroll = calcMaxScrollByY(elementBox);
  const scrolledXRatio = availableXScroll ? elementBox.scrollLeft / availableXScroll : 0;
  const scrolledYRatio = availableYScroll ? elementBox.scrollHeight / availableYScroll : 0;
  return {
    left: scrolledXRatio <= 1 ? scrolledXRatio * 100 : 100,
    top: scrolledYRatio <= 1 ? scrolledYRatio * 100 : 100,
  };
};
