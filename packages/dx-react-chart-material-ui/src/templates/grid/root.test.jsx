import * as React from 'react';
import { createShallow, getClasses } from 'material-ui/test-utils';
import { Root } from './root';

describe('Root', () => {
  const shallow = createShallow({ dive: true });
  const classes = getClasses(<Root>child</Root>);
  it('should render root element', () => {
    const tree = shallow((
      <Root >
        <text>a</text>
      </Root>
    ));

    const g = tree.find('g');

    expect(g.find('text').text()).toBe('a');
  });

  it('should pass the className prop to the root element', () => {
    const tree = shallow((
      <Root className="custom-class" >
        <text>a</text>
      </Root>
    ));

    expect(tree.is(`.${classes.root}`))
      .toBeTruthy();
    expect(tree.is('.custom-class'))
      .toBeTruthy();
  });

  it('should pass the rest property to the root element', () => {
    const tree = shallow(<Root customProperty>child</Root>);
    const { customProperty } = tree.find('g').props();
    expect(customProperty).toBeTruthy();
  });
});
