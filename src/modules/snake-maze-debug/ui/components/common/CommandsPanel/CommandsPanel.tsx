import { Button } from '@mui/material';
import { parseJSONSafe } from '@stone-flower-org/js-utils';
import React, { useState } from 'react';

import { useDSMApp } from '@/src/modules/snake-maze-client/ui/hooks/useDSMApp';
import { CommandsSelect } from '@/src/modules/snake-maze-debug/ui/components/common/CommandsSelect';
import { DSMCommandOption } from '@/src/modules/snake-maze-debug/utils/commands';

import { StyledCommandsPanelWrapper, StyledConfigBlock, StyledJsonInput, StyledPayloadBlock } from './styles';

export interface CommandsPanelProps {}

export const CommandsPanel = () => {
  const dsmApp = useDSMApp();

  const [commandOption, setCommandOption] = useState<DSMCommandOption | null>(null);
  const [payload, setPayload] = useState('');

  const onExecClick = () => {
    if (!commandOption?.Class) return;
    const payloadObj = parseJSONSafe(payload) ?? {};
    const command = commandOption.Class.create(payloadObj);
    dsmApp.getService('simulation').getGameClient().getCommandManager().exec(commandOption.Class.name, command);
  };

  return (
    <StyledCommandsPanelWrapper>
      <StyledConfigBlock>
        <CommandsSelect
          onChange={setCommandOption}
          value={commandOption}
        />
        <Button
          onClick={onExecClick}
          variant="contained"
        >
          Exec
        </Button>
      </StyledConfigBlock>
      <StyledPayloadBlock>
        <StyledJsonInput
          maxRows={6}
          minRows={6}
          onChange={setPayload}
          placeholder="Payload"
          value={payload}
        />
      </StyledPayloadBlock>
    </StyledCommandsPanelWrapper>
  );
};
