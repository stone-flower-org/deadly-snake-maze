import React, { FC, PropsWithChildren } from 'react';

export type DefaultProps = PropsWithChildren;

export const Default: FC<DefaultProps> = ({ children }: DefaultProps) => <>{children}</>;
