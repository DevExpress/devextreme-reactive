import * as React from 'react';
import { shallow } from 'enzyme';
import { Root } from './root';

describe('Scatter root', () => {
  const defaultProps = {
    x: 1,
    y: 2,
  };

  it('should transform group', () => {
    const tree = shallow((
      <Root
        {...defaultProps}
      >
        <span className="test" />
      </Root>
    ));
    const { transform } = tree.find('g').props();
    expect(transform).toBe('translate(1 2)');
  });

  it('should render children element', () => {
    const tree = shallow((
      <Root
        {...defaultProps}
      >
        <span className="test" />
      </Root>
    ));
    expect(tree.find('.test').exists())
      .toBeTruthy();
  });

  it('should pass the rest property to the root element', () => {
    const tree = shallow(<Root {...defaultProps} customProperty>child</Root>);
    const { customProperty } = tree.find('g').props();
    expect(customProperty).toBeTruthy();
  });
});
