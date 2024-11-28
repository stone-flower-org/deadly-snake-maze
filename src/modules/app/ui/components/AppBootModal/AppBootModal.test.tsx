import React, { act } from 'react';
import { vi } from 'vitest';

import { render } from '@/src/modules/tests/utils';

import { AppBootModal, AppBootModalProps } from './AppBootModal';

const renderAppBootModal = (props: Partial<AppBootModalProps> = {}) => render(<AppBootModal {...props} />);

describe('AppBootModal', () => {
  it('should render null when progress 1', () => {
    const { container } = renderAppBootModal({ progress: 1 });
    expect(container).toBeEmptyDOMElement();
  });

  it('should render modal with provided progressbar value', () => {
    const progress = 0.45;
    const { getByRole } = renderAppBootModal({ progress });

    const progressbarEl = getByRole('progressbar');

    expect(progressbarEl).toHaveAttribute('aria-valuenow', String(progress * 100));
  });

  it('should add closing class to modal when progress == 1 after rerender', () => {
    vi.useFakeTimers();
    const { rerender, getByRole } = renderAppBootModal({ progress: 0 });

    rerender(<AppBootModal progress={1} />);

    expect(getByRole('dialog')).toHaveClass('boot-modal--closing');

    vi.useRealTimers();
  });

  it('should remove modal after 400ms when modal is rerendered with progress == 1', () => {
    vi.useFakeTimers();
    const { rerender, queryByRole } = renderAppBootModal({ progress: 0 });

    rerender(<AppBootModal progress={1} />);
    act(() => {
      vi.advanceTimersByTime(400);
    });

    expect(queryByRole('dialog')).not.toBeInTheDocument();

    vi.useRealTimers();
  });
});
