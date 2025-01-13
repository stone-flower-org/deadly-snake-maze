import React from 'react';

import { CommandsPanel } from '@/src/modules/snake-maze-debug/ui/components/common/CommandsPanel';
import { StatePanel } from '@/src/modules/snake-maze-debug/ui/components/common/StatePanel';
import { Tool } from '@/src/modules/snake-maze-debug/ui/components/common/Tool';
import { ToolsSidebar } from '@/src/modules/snake-maze-debug/ui/components/common/ToolsSidebar';

export interface SandboxToolsProps {}

export const SandboxTools = () => (
  <ToolsSidebar
    defaultOpen
    tools={[
      <Tool
        key="Commands"
        panel={<CommandsPanel />}
        tab="Commands"
      />,
      <Tool
        key="State"
        panel={<StatePanel />}
        tab="State"
      />,
    ]}
  />
);
