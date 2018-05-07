import * as React from 'react';
import { shallow } from 'enzyme';
import { Root } from './root';

const defaultProps = {
  x: 1,
  y: 2,
  refsHandler: jest.fn(),
  children: null,
};

describe('Root', () => {
  it('should render root element', () => {
    const tree = shallow((
      <Root {...defaultProps} >
        <text>a</text>
      </Root>
    ));

    const g = tree.find('g');
    const { transform } = g.props();

    expect(transform).toBe('translate(1 2)');
    expect(g.find('text').text()).toBe('a');
  });

  it('should pass the className prop to the root element', () => {
    const tree = shallow((
      <Root {...defaultProps} className="custom-class">
        <text>a</text>
      </Root>
    ));

    expect(tree.is('.dx-c-bs4-crisp-edges')).toBeTruthy();
    expect(tree.is('.custom-class')).toBeTruthy();
  });

  it('should pass the rest property to the root element', () => {
    const tree = shallow((
      <Root {...defaultProps} customProperty >
        <text>a</text>
      </Root>));
    const { customProperty } = tree.find('g').props();
    expect(customProperty).toBeTruthy();
  });
});
