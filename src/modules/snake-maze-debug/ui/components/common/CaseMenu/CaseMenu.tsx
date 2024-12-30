import { ListItem, TextField } from '@mui/material';
import { doesIncludeCaseInsensitive } from '@stone-flower-org/js-utils';
import React, { FC, useEffect, useState } from 'react';

import { app } from '@/src/modules/app/boot';
import { Link } from '@/src/modules/common/ui/components/Link';
import { useDebounce } from '@/src/modules/common/ui/hooks';
import { TextFieldChangeEvent } from '@/src/modules/common/utils/mui/types';
import { SNAKE_MAZE_DEBUG_CASE_PAGE_ID } from '@/src/modules/snake-maze-debug/constants';
import { CASES } from '@/src/modules/snake-maze-debug/utils/cases';

import { StyledList, StyledSearchBlock, StyledWrapper } from './styles';

export const CaseMenu: FC = () => {
  const [cases, setCases] = useState(CASES);
  const [caseNameFilter, setCaseNameFilter] = useState('');

  const onSearchChange = (e: TextFieldChangeEvent) => {
    setCaseNameFilter(e.target.value);
  };

  const filterCases = useDebounce(
    () => {
      setCases(CASES.filter(({ name }) => doesIncludeCaseInsensitive(name, caseNameFilter)));
    },
    [caseNameFilter],
    100,
  );

  useEffect(() => {
    filterCases();
  }, [filterCases]);

  return (
    <StyledWrapper>
      <StyledSearchBlock>
        <TextField
          label="Search"
          onChange={onSearchChange}
          value={caseNameFilter}
        />
      </StyledSearchBlock>
      <StyledList>
        {cases.map(({ id, name }) => (
          <ListItem key={id}>
            <Link
              to={app.getService('routesStore').generateFullPathById(SNAKE_MAZE_DEBUG_CASE_PAGE_ID, {
                params: { caseId: id },
              })}
            >
              {name}
            </Link>
          </ListItem>
        ))}
      </StyledList>
    </StyledWrapper>
  );
};
