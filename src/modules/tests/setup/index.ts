import { configure } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import '@/src/modules/tests/register-mocks';

configure({ testIdAttribute: 'data-test-id' });
