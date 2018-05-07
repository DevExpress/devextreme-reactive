import * as React from 'react';
import { shallow } from 'enzyme';
import List from 'material-ui/List';
import { Root } from './root';

describe('Root', () => {
  it('should render List', () => {
    const tree = shallow((
      <Root >
        <text>a</text>
      </Root>
    ));
    expect(tree.find(List)).toHaveLength(1);
  });

  it('should render children item', () => {
    const tree = shallow((
      <Root >
        <span>a</span>
      </Root>
    ));
    const span = tree.find(List).children();

    expect(span).toHaveLength(1);
    expect(span.type()).toEqual('span');
  });

  it('should pass the rest property to the root element', () => {
    const tree = shallow(<Root customProperty>child</Root>);
    const { customProperty } = tree.find(List).props();
    expect(customProperty).toBeTruthy();
  });
});
