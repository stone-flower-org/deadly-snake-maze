import React, { cloneElement, FC, Fragment, PropsWithChildren } from 'react';

import { Wrapper } from './types';

export interface ConditionalWrapperProps extends PropsWithChildren<unknown> {
  component: Wrapper;
  condition: boolean;
  fallback?: Wrapper;
}

export const ConditionalWrapper: FC<ConditionalWrapperProps> = ({
  children,
  component,
  condition,
  fallback = <Fragment />,
}: ConditionalWrapperProps) => {
  if (condition) return cloneElement(component, component.props, children);
  return cloneElement(fallback, fallback.props, children);
};
