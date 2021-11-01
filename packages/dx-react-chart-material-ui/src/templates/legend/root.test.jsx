import * as React from 'react';
import { createShallow } from '@devexpress/dx-testing';
import List from '@mui/material/List';
import { classes } from '../utils';
import { Root } from './root';

describe('Root', () => {
  const shallow = createShallow({ dive: true });
  it('should render List', () => {
    const tree = shallow((
      <Root>
        <div />
      </Root>
    ));
    expect(tree.find(List))
      .toHaveLength(1);
  });

  it('should render children item', () => {
    const tree = shallow((
      <Root>
        <div />
      </Root>
    ));
    const children = tree.find(List).children();

    expect(children)
      .toHaveLength(1);
    expect(children.type())
      .toEqual('div');
  });

  it('should pass the className prop to the root element', () => {
    const tree = shallow((
      <Root className="custom-class">
        {' '}
        <div />
        {' '}
      </Root>));

    expect(tree.is(`.${classes.root}.custom-class`))
      .toBeTruthy();
  });

  it('should pass the rest property to the root element', () => {
    const tree = shallow(
      <Root customProperty>
        child
      </Root>,
    );

    const { customProperty } = tree.find(List).props();

    expect(customProperty)
      .toBeTruthy();
  });
});
