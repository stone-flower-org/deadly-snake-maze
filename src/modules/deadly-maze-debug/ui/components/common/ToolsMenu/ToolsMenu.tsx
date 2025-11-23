import React, { ReactNode, useMemo, useState } from 'react';

import { Case, Switch } from '@/src/modules/common/ui/components/Renderers';
import { ToolReactElement } from '@/src/modules/deadly-maze-debug/ui/components/common/Tool';

import { StyledTab, StyledTabButton, StyledTabPanel, StyledTabsList, StyledToolsMenuWrapper } from './styles';
import { EMPTY_TAB_ID } from './utils';

export interface ToolsMenuProps {
  className?: string;
  tools: ToolReactElement[];
}

export const ToolsMenu = ({ className, tools }: ToolsMenuProps) => {
  const [tabId, setTabId] = useState(EMPTY_TAB_ID);

  const { tabs, panels } = useMemo(() => {
    const panels: ReactNode[] = [];
    const tabs: ReactNode[] = [];

    tools.forEach((tool) => {
      panels.push(tool.props.panel);
      tabs.push(tool.props.tab);
    });

    return {
      panels,
      tabs,
    };
  }, [tools]);

  const handleTabClick = (tab: number) => () => {
    setTabId((prev) => {
      if (prev === tab) return EMPTY_TAB_ID;
      return tab;
    });
  };

  return (
    <StyledToolsMenuWrapper className={className}>
      {tabId !== EMPTY_TAB_ID && (
        <StyledTabPanel>
          <Switch value={tabId}>
            {panels.map((panel, i) => (
              <Case
                key={i}
                value={i}
              >
                {panel}
              </Case>
            ))}
          </Switch>
        </StyledTabPanel>
      )}
      <StyledTabsList>
        {tabs.map((tab, i) => (
          <StyledTab key={i}>
            <StyledTabButton
              color={i === tabId ? 'secondary' : 'primary'}
              onClick={handleTabClick(i)}
            >
              {tab}
            </StyledTabButton>
          </StyledTab>
        ))}
      </StyledTabsList>
    </StyledToolsMenuWrapper>
  );
};
