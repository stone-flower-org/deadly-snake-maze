import React from 'react';

import { routesStoreProvider } from '@/src/modules/app/boot';
import { LogoIcon } from '@/src/modules/app/ui/Icons';
import { SNAKE_MAZE_CLIENT_PAGE_ID } from '@/src/modules/snake-maze-client/constants';

import { StyledButtonLink, StyledLogoBlock, StyledMenu, StyledMenuItem, StyledWrapper } from './styles';

export interface MainMenuProps {
  className?: string;
}

export const MainMenu = ({ className }: MainMenuProps) => (
  <StyledWrapper className={className}>
    <StyledLogoBlock>
      <LogoIcon fontSize="8rem" />
    </StyledLogoBlock>
    <StyledMenu>
      <StyledMenuItem>
        <StyledButtonLink
          to={routesStoreProvider.get().generateFullPathById(SNAKE_MAZE_CLIENT_PAGE_ID)}
          variant="contained"
        >
          Play
        </StyledButtonLink>
      </StyledMenuItem>
    </StyledMenu>
  </StyledWrapper>
);
