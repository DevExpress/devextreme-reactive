import * as React from 'react';
import { createShallow, getClasses } from 'material-ui/test-utils';
import { ListItem } from 'material-ui/List';
import { Item } from './item';

describe('Root', () => {
  const shallow = createShallow({ dive: true });
  const classes = getClasses(<Item>children</Item>);
  it('should render List item', () => {
    const tree = shallow((
      <Item >
        <span>a</span>
      </Item>
    ));

    expect(tree.find(ListItem)).toHaveLength(1);
  });

  it('should render children item', () => {
    const tree = shallow((
      <Item >
        <span>a</span>
      </Item>
    ));
    const span = tree.find(ListItem).children();

    expect(span).toHaveLength(1);
    expect(span.type()).toEqual('span');
  });

  it('should pass the className prop to the root element', () => {
    const tree = shallow((
      <Item className="custom-class">a</Item>
    ));

    expect(tree.is(`.${classes.root}`))
      .toBeTruthy();
    expect(tree.is('.custom-class'))
      .toBeTruthy();
  });
});
