import { TextField } from '@mui/material';
import React, { SyntheticEvent } from 'react';

import { DSMCommandOption, DSMCommandOptions } from '@/src/modules/snake-maze-debug/utils/commands';

import { StyledAutocomplete } from './styles';

export interface CommandsSelectProps {
  value?: DSMCommandOption | null;
  onChange?: (option: DSMCommandOption, e: SyntheticEvent) => void;
}

export const CommandsSelect = ({ value, onChange }: CommandsSelectProps) => {
  const handleOnChange = (e: SyntheticEvent, value: unknown) => {
    onChange && onChange(value as DSMCommandOption, e);
  };

  return (
    <StyledAutocomplete
      onChange={handleOnChange}
      options={DSMCommandOptions}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Commands"
        />
      )}
      value={value}
    />
  );
};
