import React, { FC, PropsWithChildren } from 'react';

export interface CaseProps extends PropsWithChildren {
  value: unknown;
}

export const Case: FC<CaseProps> = ({ children }: CaseProps) => <>{children}</>;
