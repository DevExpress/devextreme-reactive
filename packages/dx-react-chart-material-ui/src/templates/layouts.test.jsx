import * as React from 'react';
import { createShallow, getClasses } from 'material-ui/test-utils';
import { Root } from './layout';

const defaultProps = {
  width: 200, height: 100,
};

describe('Root', () => {
  const shallow = createShallow({ dive: true });
  const classes = getClasses(<Root {...defaultProps}>children</Root>);
  it('should render List item', () => {
    const tree = shallow((
      <Root {...defaultProps} >
        <span>a</span>
      </Root>
    ));

    expect(tree.find('div'))
      .toHaveLength(1);
  });

  it('should render children item', () => {
    const tree = shallow((
      <Root {...defaultProps} >
        <span>a</span>
      </Root>
    ));
    const span = tree.find('div').children();

    expect(span)
      .toHaveLength(1);
    expect(span.type())
      .toEqual('span');
  });

  it('should pass the className prop to the root element', () => {
    const tree = shallow((
      <Root {...defaultProps} className="custom-class" >a</Root>
    ));

    expect(tree.is(`.${classes.root}`))
      .toBeTruthy();
    expect(tree.is('.custom-class'))
      .toBeTruthy();
  });

  it('should pass the rest property to the root element', () => {
    const tree = shallow((
      <Root {...defaultProps} customProperty>a</Root>
    ));
    const { customProperty } = tree.find('div').props();
    expect(customProperty)
      .toBeTruthy();
  });
});
