import { render } from '@testing-library/react';
import React from 'react';

import { createComponentFromSvg } from './utils';

const Svg = () => <>Icon</>;
const name = 'SomeName';

describe('createComponentFromSvg', () => {
  it('should return react component with given display name', () => {
    const Component = createComponentFromSvg(Svg, name);
    expect(Component).toBeInstanceOf(Function);
    expect(Component.displayName).toBe(name);
  });

  it('should render svg icon from output react component', () => {
    const Component = createComponentFromSvg(Svg, name);
    const { baseElement } = render(<Component />);
    expect(baseElement).toMatchInlineSnapshot(`
      <body>
        <div>
          Icon
        </div>
      </body>
    `);
  });
});
