import { render } from '@testing-library/react';
import React from 'react';

import { ConditionalWrapper, ConditionalWrapperProps } from './ConditionalWrapper';

const componentWrapperTestId = 'component-wrapper';
const fallbackWrapperTestId = 'fallback-wrapper';

const defaultProps = {
  children: 'Some content',
  component: <div data-test-id={componentWrapperTestId} />,
  condition: true,
  fallback: <div data-test-id={fallbackWrapperTestId} />,
};

const renderConditionalWrapper = (props: Partial<ConditionalWrapperProps> = {}) =>
  render(
    <ConditionalWrapper
      {...defaultProps}
      {...props}
    />,
  );

describe('ConditionalWrapper', () => {
  it('shouhld render component wrapper when condition true', () => {
    const { getByTestId, getByText } = renderConditionalWrapper();
    expect(getByTestId(componentWrapperTestId)).toBeInTheDocument();
    expect(getByText(defaultProps.children)).toBeInTheDocument();
  });

  it('shouhld render fallback wrapper when condition false', () => {
    const { getByTestId, getByText } = renderConditionalWrapper({
      condition: false,
    });
    expect(getByTestId(fallbackWrapperTestId)).toBeInTheDocument();
    expect(getByText(defaultProps.children)).toBeInTheDocument();
  });
});
