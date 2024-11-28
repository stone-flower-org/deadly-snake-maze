import userEvent from '@testing-library/user-event';
import React from 'react';
import { vi } from 'vitest';

import { renderWithProviders, setupAndBootApp } from '@/src/modules/tests/utils';

import { PopperCard, PopperCardProps } from './PopperCard';
import { DEFAULT_POPPER_CARD_PROPS } from './constants';

const defaultButtonContent = 'Some Button Content';

const defaultProps = {
  'data-test-id': DEFAULT_POPPER_CARD_PROPS['data-test-id'],
  children: 'Some Content',
  button: <button>{defaultButtonContent}</button>,
  open: false,
  onChange: vi.fn(),
};

const renderPopperCard = (props: Partial<PopperCardProps> = {}) =>
  renderWithProviders(
    <PopperCard
      {...defaultProps}
      {...props}
    />,
  );

beforeAll(async () => {
  await setupAndBootApp();
});

describe('PopperCard', () => {
  beforeEach(() => {
    defaultProps.onChange.mockClear();
  });

  it('should hide provided children when open is false', () => {
    const { queryByText } = renderPopperCard();
    expect(queryByText(defaultProps.children)).not.toBeInTheDocument();
  });

  it('should show provided children when open is true', () => {
    const { queryByText } = renderPopperCard({ open: true });
    expect(queryByText(defaultProps.children)).toBeInTheDocument();
  });

  it('should call onChange with updated open value after click on button', async () => {
    const { getByText } = renderPopperCard();
    await userEvent.click(getByText(defaultButtonContent));
    expect(defaultProps.onChange).toHaveBeenCalledWith(!defaultProps.open, undefined);
  });

  it('should call onChange with false when click outside', async () => {
    const { container } = renderPopperCard({ open: true });
    await userEvent.click(container.firstChild as Element);
    expect(defaultProps.onChange).toHaveBeenCalledWith(false, undefined);
  });

  it("should not call onChange when click on child's element", async () => {
    const { getByText } = renderPopperCard({ open: true });
    await userEvent.click(getByText(defaultProps.children));
    expect(defaultProps.onChange).not.toHaveBeenCalledWith(!defaultProps.open);
  });
});
