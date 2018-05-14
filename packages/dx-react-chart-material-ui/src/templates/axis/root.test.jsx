import * as React from 'react';
import { createShallow, getClasses } from 'material-ui/test-utils';
import { Root } from './root';

const defaultProps = {
  x: 1, y: 2, refsHandler: jest.fn(),
};

describe('Root', () => {
  const shallow = createShallow({ dive: true });
  const classes = getClasses(<Root {...defaultProps} >child</Root>);
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
      <Root {...defaultProps} className="custom-class" >
        <div />
      </Root>
    ));

    expect(tree.is(`.${classes.root}.custom-class`))
      .toBeTruthy();
  });

  it('should pass the rest property to the root element', () => {
    const tree = shallow(<Root {...defaultProps} customProperty>child</Root>);

    const { customProperty } = tree.find('g').props();

    expect(customProperty)
      .toBeTruthy();
  });
});
