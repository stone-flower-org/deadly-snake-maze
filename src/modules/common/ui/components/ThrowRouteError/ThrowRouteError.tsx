import { FC, ReactElement } from 'react';
import { useRouteError } from 'react-router-dom';

export interface ThrowRouteErrorProps {
  children?: ReactElement;
}

export const ThrowRouteError: FC<ThrowRouteErrorProps> = ({ children }) => {
  const error = useRouteError();
  if (error) throw error;
  return children ?? null;
};
