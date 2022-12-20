import * as React from 'react';
import { createShallow } from '@devexpress/dx-testing';
import { ListItem } from '@mui/material';
import { classes } from '../utils';
import { Item } from './item';

describe('Root', () => {
  const shallow = createShallow({ dive: true });
  it('should render List item', () => {
    const tree = shallow((
      <Item>
        <div />
      </Item>
    ));

    expect(tree.find(ListItem))
      .toHaveLength(1);
  });

  it('should render children item', () => {
    const tree = shallow((
      <Item>
        <div />
      </Item>
    ));
    const span = tree.find(ListItem).children();

    expect(span)
      .toHaveLength(1);
    expect(span.type())
      .toEqual('div');
  });

  it('should pass the className prop to the root element', () => {
    const tree = shallow((
      <Item className="custom-class">
        <div />
      </Item>
    ));

    expect(tree.is(`.${classes.root}.custom-class`))
      .toBeTruthy();
  });

  it('should pass the rest property to the root element', () => {
    const tree = shallow(
      <Item customProperty>
        child
      </Item>,
    );

    const { customProperty } = tree.find(ListItem).props();

    expect(customProperty)
      .toBeTruthy();
  });
});
