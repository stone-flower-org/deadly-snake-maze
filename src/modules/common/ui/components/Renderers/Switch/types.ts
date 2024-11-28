import { ReactElement } from 'react';

import { Case, CaseProps } from './Case';
import { Default, DefaultProps } from './Default';

export type SwitchChildElement = ReactElement<CaseProps, typeof Case> | ReactElement<DefaultProps, typeof Default>;

export type SwitchChildren = SwitchChildElement | SwitchChildElement[];
