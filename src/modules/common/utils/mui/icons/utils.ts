import { SvgIconProps as BaseSvgIconProps } from '@mui/material';
import { createElement, CSSProperties, ElementType, FC } from 'react';

import { StyledIcon } from './styles';

export interface SvgIconProps extends Omit<BaseSvgIconProps, 'component' | 'fontSize'> {
  fontSize?: BaseSvgIconProps['fontSize'] | CSSProperties['width'];
}

export const createComponentFromSvg = (svg: ElementType, name: string) => {
  const Icon: FC<SvgIconProps> = (props: SvgIconProps) =>
    createElement(StyledIcon, {
      inheritViewBox: true,
      role: 'img',
      titleAccess: name,
      ...props,
      component: svg,
    } as BaseSvgIconProps);
  Icon.displayName = name;
  return Icon;
};
