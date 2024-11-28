import React, { FC } from 'react';

import { Loading } from '@/src/modules/common/ui/components/Loading';

import { StyledFallbackContainer } from './styles';

export interface DefaultFallbackProps {
  size?: string;
  title?: string;
}

export const DEFAULT_FALLBACK_PROPS = {
  size: 'large',
  title: 'Loading',
};

export const DefaultFallback: FC<DefaultFallbackProps> = ({
  size = DEFAULT_FALLBACK_PROPS.size,
  title = DEFAULT_FALLBACK_PROPS.title,
}: DefaultFallbackProps) => (
  <StyledFallbackContainer>
    <Loading
      size={size}
      title={title}
    />
  </StyledFallbackContainer>
);
