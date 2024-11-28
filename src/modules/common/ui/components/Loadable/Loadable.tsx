import React, { PropsWithChildren, ReactElement, ReactNode } from 'react';

import { DefaultFallback } from './DefaultFallback';

export interface LoadableProps extends PropsWithChildren<unknown> {
  fallback?: ReactNode;
  loading?: boolean;
}

export const DEFAULT_LOADABLE_PROPS = {
  loading: false,
};

export const Loadable = ({
  children,
  fallback = <DefaultFallback />,
  loading = DEFAULT_LOADABLE_PROPS.loading,
}: LoadableProps) => {
  if (loading) return <>{fallback}</>;
  return children as ReactElement;
};
