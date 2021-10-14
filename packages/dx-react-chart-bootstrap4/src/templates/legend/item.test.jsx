import * as React from 'react';
import { create } from 'react-test-renderer';
import { Item } from './item';

describe('Item', () => {
  it('should render root element with the child element', () => {
    const tree = create((
      <Item>
        <div />
      </Item>
    ));

    const li = tree.root.findByType('li');
    expect(li).toBeDefined();
    expect(li.findByType('div')).not.toBeNull();
  });

  it('should pass the className prop to the root element', () => {
    const tree = create((
      <Item className="custom-class">
        <div />
      </Item>
    ));

    expect(tree.root.findByType('li').props.className)
      .toBe('d-flex list-group-item border-0 py-1 px-4 align-items-center custom-class');
  });

  it('should pass the rest property to the root element', () => {
    const tree = create((
      <Item custom="test">
        <div />
      </Item>));

    expect(tree.root.findByType('li').props.custom).toEqual('test');
  });
});
