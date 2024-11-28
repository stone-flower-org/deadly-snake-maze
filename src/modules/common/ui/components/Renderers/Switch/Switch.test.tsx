import { render } from '@testing-library/react';
import React, { createElement } from 'react';

import { Case } from './Case';
import { Default } from './Default';
import { Switch, SwitchProps } from './Switch';

const defaultProps = {
  value: -1,
};

const renderSwitch = (props: Partial<SwitchProps> = {}) =>
  render(
    <Switch
      {...defaultProps}
      {...props}
    />,
  );

describe('Switch', () => {
  it('should render cases contents with matched values', () => {
    const cases = [
      { children: 'First Case', value: 1 },
      { children: 'Second Case', value: 2 },
      { children: 'Third Case', value: 1 },
    ];
    const { container } = renderSwitch({
      value: 1,
      children: cases.map(({ children, value }, i) => createElement(Case, { value, key: i }, children)),
    });

    expect(container).toHaveTextContent('First Case');
    expect(container).not.toHaveTextContent('Second Case');
    expect(container).toHaveTextContent('Third Case');
  });

  it('should render default content when no cases matched', () => {
    const value = 3;
    const cases = [
      { children: 'First Case', value: 1 },
      { children: 'Second Case', value: 2 },
      { children: 'Third Case', value: 1 },
    ];
    const defaultChildrent = 'Default Content';
    const { container } = renderSwitch({
      value,
      children: [
        ...cases.map(({ children, value }, i) => createElement(Case, { value, key: i }, children)),
        createElement(Default, { key: cases.length }, defaultChildrent),
      ],
    });

    cases.forEach((caseComp) => {
      expect(container).not.toHaveTextContent(caseComp.children);
    });
    expect(container).toHaveTextContent(defaultChildrent);
  });
});
