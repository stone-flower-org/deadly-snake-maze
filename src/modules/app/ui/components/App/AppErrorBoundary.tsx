import React, { Component, ReactNode, useEffect, useState } from 'react';

import { app } from '@/src/modules/app/boot';

export type AppErrorBoundaryCatcherProps = {
  children?: ReactNode;
  onError: (error: Error) => void;
};

export class AppErrorBoundaryCatcher extends Component<AppErrorBoundaryCatcherProps> {
  constructor(props: AppErrorBoundaryCatcherProps) {
    super(props);
  }

  componentDidCatch(error: Error) {
    this.props.onError(error);
  }

  render() {
    return this.props.children;
  }
}

export interface AppErrorBoundaryProps {
  children?: ReactNode;
  fallback?: ReactNode;
}

export const AppErrorBoundary = ({ children, fallback }: AppErrorBoundaryProps) => {
  const [error, setError] = useState<Error | undefined>();

  const rendered = error ? fallback || error.message : children;

  useEffect(() => {
    if (!error) return;
    setError(error);
    app.getService('error-reporter').report(error);
  }, [error]);

  return <AppErrorBoundaryCatcher onError={setError}>{rendered}</AppErrorBoundaryCatcher>;
};
