import { fireEvent, waitFor } from '@testing-library/react';
import React from 'react';

import { renderWithProviders, setupAndBootApp } from '@/src/modules/tests/utils';

import { DEFAULT_TOOLTIP_RPOPS, Tooltip, TooltipProps } from './Tooltip';

const DEFAULT_CHILDREN_CONTENT = 'Some Ref';
const DEFAULT_TITLE_CONTENT = 'Some Title';

const defaultProps = {
  'data-test-id': DEFAULT_TOOLTIP_RPOPS['data-test-id'],
  children: <span>{DEFAULT_CHILDREN_CONTENT}</span>,
  title: <span>{DEFAULT_TITLE_CONTENT}</span>,
};

const getProps = (props: Partial<TooltipProps> = {}) => ({
  ...defaultProps,
  ...props,
});

const renderTooltip = (props: Partial<TooltipProps> = {}) => renderWithProviders(<Tooltip {...getProps(props)} />);

beforeAll(async () => {
  await setupAndBootApp();
});

describe('Tooltip', () => {
  it("should render component with visible children and hidden title when children's unhovered", () => {
    const { queryByText } = renderTooltip();
    expect(queryByText(DEFAULT_CHILDREN_CONTENT)).toBeInTheDocument();
    expect(queryByText(DEFAULT_TITLE_CONTENT)).not.toBeInTheDocument();
  });

  it("should render component with visible title when children's hovered", async () => {
    const { getByText } = renderTooltip();
    const ref = getByText(DEFAULT_CHILDREN_CONTENT);
    fireEvent.mouseEnter(ref);
    await waitFor(() => {
      expect(getByText(DEFAULT_TITLE_CONTENT)).toBeInTheDocument();
    });
  });
});
