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
      <Root {...defaultProps}>
        <div />
      </Root>
    ));

    const g = tree.find('g');
    const { transform } = g.props();

    expect(transform)
      .toBe('translate(1 2)');
    expect(g.find('div').exists())
      .toBeTruthy();
  });


  it('should pass the className prop to the root element', () => {
    const tree = shallow((
      <Root {...defaultProps} className="custom-class">
        <div />
      </Root>
    ));

    expect(tree.is('.custom-class.dx-c-bs4-crisp-edges'))
      .toBeTruthy();
  });

  it('should pass the rest property to the root element', () => {
    const tree = shallow((
      <Root {...defaultProps} customProperty >
        <div />
      </Root>));

    const { customProperty } = tree.find('g').props();

    expect(customProperty)
      .toBeTruthy();
  });
});
