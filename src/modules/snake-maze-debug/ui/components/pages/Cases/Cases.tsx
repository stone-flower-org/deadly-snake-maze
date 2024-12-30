import { isKeyOf } from '@stone-flower-org/js-utils';
import React, { FC } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { app } from '@/src/modules/app/boot';
import { NOT_FOUND_PAGE_ID } from '@/src/modules/app/constants/router';
import { CASES_BY_ID } from '@/src/modules/snake-maze-debug/utils/cases';

export const Cases: FC = () => {
  const { caseId } = useParams<{ caseId: string }>();
  const CaseComponent = isKeyOf(CASES_BY_ID, caseId) ? CASES_BY_ID[caseId].Component : undefined;
  if (!CaseComponent) return <Navigate to={app.getService('routesStore').generateFullPathById(NOT_FOUND_PAGE_ID)} />;
  return <CaseComponent />;
};
