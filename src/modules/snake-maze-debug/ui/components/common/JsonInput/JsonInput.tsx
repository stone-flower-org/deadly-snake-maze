import { TextareaAutosizeProps, Tooltip } from '@mui/material';
import { beautifyJSONSafe, getJSONErrorMessage, insertTextInInput } from '@stone-flower-org/js-utils';
import React, { ChangeEvent, KeyboardEvent, MouseEvent, SyntheticEvent, useMemo, useRef } from 'react';

import {
  StyledActions,
  StyledButton,
  StyledErrorMessage,
  StyledFooter,
  StyledInput,
  StyledWrapper,
  StyledLog,
} from './styles';

export interface JsonInputProps extends Omit<TextareaAutosizeProps, 'value' | 'onChange'> {
  onChange?: (value: string, e: SyntheticEvent) => void;
  value?: string;
}

export const JsonInput = ({ onChange, value, ...rest }: JsonInputProps) => {
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const jsonErrorMessage = useMemo(() => (value ? getJSONErrorMessage(value ?? '') : null), [value]);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange && onChange(e.target.value, e);
  };

  const handleOnKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Tab') {
      e.preventDefault();

      if (e.shiftKey) return;

      if (!inputRef.current) return;
      insertTextInInput(inputRef.current, '  ');
    }
  };

  const onBeautifyClick = (e: MouseEvent) => {
    if (jsonErrorMessage || !inputRef.current) return;
    onChange && onChange(beautifyJSONSafe(value ?? ''), e);
  };

  return (
    <StyledWrapper>
      <StyledInput
        {...rest}
        error={!!jsonErrorMessage}
        onChange={handleOnChange}
        onKeyDown={handleOnKeyDown}
        ref={inputRef}
        value={value}
      />
      <StyledFooter>
        <StyledActions>
          <StyledButton onClick={onBeautifyClick}>Beautify</StyledButton>
        </StyledActions>
        {jsonErrorMessage && (
          <Tooltip title={jsonErrorMessage}>
            <StyledLog>
              <StyledErrorMessage>{jsonErrorMessage}</StyledErrorMessage>
            </StyledLog>
          </Tooltip>
        )}
      </StyledFooter>
    </StyledWrapper>
  );
};
