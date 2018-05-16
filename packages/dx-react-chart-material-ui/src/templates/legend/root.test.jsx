import * as React from 'react';
import { shallow } from 'enzyme';
import List from '@material-ui/core/List';
import { Root } from './root';

describe('Root', () => {
  it('should render List', () => {
    const tree = shallow((
      <Root >
        <div />
      </Root>
    ));
    expect(tree.find(List))
      .toHaveLength(1);
  });

  it('should render children item', () => {
    const tree = shallow((
      <Root >
        <div />
      </Root>
    ));
    const children = tree.find(List).children();

    expect(children)
      .toHaveLength(1);
    expect(children.type())
      .toEqual('div');
  });

  it('should pass the rest property to the root element', () => {
    const tree = shallow(<Root customProperty>child</Root>);

    const { customProperty } = tree.find(List).props();

    expect(customProperty)
      .toBeTruthy();
  });
});
