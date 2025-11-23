import { styled } from '@mui/material';

import { JsonInput } from '@/src/modules/deadly-maze-debug/ui/components/common/JsonInput';

export const StyledCommandsPanelWrapper = styled('div')`
  display: flex;
  flex-flow: row;
  height: 100%;
  padding: ${({ theme }) => theme.spacing(1)};
  gap: ${({ theme }) => theme.spacing(1)};
  width: 100%;
`;

export const StyledPayloadBlock = styled('div')`
  display: flex;
  flex: 1 1 auto;
`;

export const StyledConfigBlock = styled('div')`
  display: flex;
  flex: 0 320px;
  flex-flow: column;
  gap: ${({ theme }) => theme.spacing(1)};
`;

export const StyledJsonInput = styled(JsonInput)`
  resize: none;
`;
