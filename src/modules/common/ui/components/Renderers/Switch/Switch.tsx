import React, { Children, FC } from 'react';

import { SwitchChildElement, SwitchChildren } from './types';

export interface SwitchProps {
  value: unknown;
  children?: SwitchChildren;
}

export const Switch: FC<SwitchProps> = ({ children, value }: SwitchProps) => {
  const matchedEls: SwitchChildElement[] = [];
  const defaultEls: SwitchChildElement[] = [];
  Children.forEach(children, (element) => {
    if (!element) return;
    if ('value' in element.props) {
      element.props.value === value && matchedEls.push(element);
      return;
    }
    defaultEls.push(element);
  });
  return <>{matchedEls.length ? matchedEls : defaultEls}</>;
};
