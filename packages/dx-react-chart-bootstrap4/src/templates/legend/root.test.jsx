import * as React from 'react';
import { create } from 'react-test-renderer';
import { Root } from './root';

describe('Root', () => {
  it('should render root as ul', () => {
    const tree = create((
      <Root>
        <div />
      </Root>));

    const ul = tree.root.findByType('ul');
    expect(ul).toBeDefined();
    expect(ul.findByType('div')).not.toBeNull();
  });

  it('should pass the className prop to the root element', () => {
    const tree = create((
      <Root className="custom-class">
        <div />
      </Root>));

    expect(tree.root.findByType('ul').props.className).toBe('list-group py-3 custom-class');
  });

  it('should pass the rest property to the root element', () => {
    const tree = create((
      <Root custom="test">
        <div />
      </Root>));

    const { custom } = tree.root.findByType('ul').props;

    expect(custom).toEqual('test');
  });
});
