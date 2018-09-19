import * as React from 'react';
import { mount } from 'enzyme';
import { Root } from './root';

describe('Root', () => {
  it('should render root as ul', () => {
    const tree = mount((
      <Root>
        <div />
      </Root>));

    const ul = tree.find('ul');
    expect(ul).toBeDefined();
    expect(ul.find('div').exists())
      .toBeTruthy();
  });

  it('should pass the className prop to the root element', () => {
    const tree = mount((
      <Root className="custom-class">
        <div />
      </Root>));

    expect(tree.find('ul').is('.custom-class.list-group.py-3'))
      .toBeTruthy();
  });

  it('should pass the rest property to the root element', () => {
    const tree = mount((
      <Root custom="test">
        <div />
      </Root>));

    const { custom } = tree.find('ul').props();

    expect(custom).toEqual('test');
  });
});
