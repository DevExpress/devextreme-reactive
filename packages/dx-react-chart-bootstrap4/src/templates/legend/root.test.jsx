import * as React from 'react';
import { shallow } from 'enzyme';
import { Root } from './root';

describe('Root', () => {
  it('should render root as ul', () => {
    const tree = shallow((
      <Root>
        <text>a</text>
      </Root>));

    expect(tree.type()).toEqual('ul');
  });

  it('should pass the className prop to the root element', () => {
    const tree = shallow((
      <Root className="custom-class">
        <text>a</text>
      </Root>));

    expect(tree.find('ul').is('.custom-class')).toBeTruthy();
  });

  it('should pass the rest property to the root element', () => {
    const tree = shallow((
      <Root customProperty >
        <text>a</text>
      </Root>));
    const { customProperty } = tree.find('ul').props();
    expect(customProperty).toBeTruthy();
  });
});
