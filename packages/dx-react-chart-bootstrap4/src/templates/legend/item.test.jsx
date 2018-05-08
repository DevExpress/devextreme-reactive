import * as React from 'react';
import { shallow } from 'enzyme';
import { Item } from './item';

describe('Item', () => {
  it('should render root element with the child element', () => {
    const tree = shallow((
      <Item>
        <text>a</text>
      </Item>
    ));

    const li = tree.find('li');
    expect(li).toBeDefined();
    expect(li.find('text').text()).toBe('a');
  });

  it('should pass the className prop to the root element', () => {
    const tree = shallow((
      <Item className="custom-class">
        <text>a</text>
      </Item>
    ));

    expect(tree.is('.custom-class.list-group-item'))
      .toBeTruthy();
  });

  it('should pass the rest property to the root element', () => {
    const tree = shallow((
      <Item customProperty >
        <text>a</text>
      </Item>));
    const { customProperty } = tree.find('li').props();
    expect(customProperty).toBeTruthy();
  });
});
