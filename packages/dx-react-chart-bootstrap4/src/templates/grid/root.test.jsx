import * as React from 'react';
import { shallow } from 'enzyme';
import { Root } from './root';

describe('Root', () => {
  it('should render root element', () => {
    const tree = shallow((
      <Root>
        <text>a</text>
      </Root>
    ));

    const g = tree.find('g');

    expect(g).toBeDefined();
    expect(g.find('text').text()).toBe('a');
  });

  it('should pass the className prop to the root element', () => {
    const tree = shallow((
      <Root className="custom-class">
        <text>a</text>
      </Root>
    ));

    expect(tree.is('.custom-class.dx-c-bs4-crisp-edges'))
      .toBeTruthy();
  });

  it('should pass the rest property to the root element', () => {
    const tree = shallow((
      <Root customProperty >
        <text>a</text>
      </Root>));
    const { customProperty } = tree.find('g').props();
    expect(customProperty).toBeTruthy();
  });
});
