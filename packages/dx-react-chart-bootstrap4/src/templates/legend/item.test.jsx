import * as React from 'react';
import { shallow } from 'enzyme';
import { Item } from './item';

describe('Item', () => {
  it('should render root element with the child element', () => {
    const tree = shallow((
      <Item>
        <div />
      </Item>
    ));

    const li = tree.find('li');
    expect(li)
      .toBeDefined();
    expect(li.find('div').exists())
      .toBeTruthy();
  });

  it('should pass the className prop to the root element', () => {
    const tree = shallow((
      <Item className="custom-class">
        <div />
      </Item>
    ));

    expect(tree.is('.custom-class.d-flex.list-group-item.border-0.py-1.px-4.align-items-center'))
      .toBeTruthy();
  });

  it('should pass the rest property to the root element', () => {
    const tree = shallow((
      <Item customProperty >
        <div />
      </Item>));

    const { customProperty } = tree.find('li').props();

    expect(customProperty)
      .toBeTruthy();
  });
});
