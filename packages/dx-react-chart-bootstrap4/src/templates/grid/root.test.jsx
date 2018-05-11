import * as React from 'react';
import { shallow } from 'enzyme';
import { Root } from './root';

describe('Root', () => {
  it('should render root element', () => {
    const tree = shallow((
      <Root>
        <div />
      </Root>
    ));

    const g = tree.find('g');

    expect(g)
      .toBeDefined();
    expect(g.find('div').exists())
      .toBeTruthy();
  });

  it('should pass the className prop to the root element', () => {
    const tree = shallow((
      <Root className="custom-class">
        <div />
      </Root>
    ));

    expect(tree.is('.custom-class.dx-c-bs4-crisp-edges'))
      .toBeTruthy();
  });

  it('should pass the rest property to the root element', () => {
    const tree = shallow((
      <Root customProperty >
        <div />
      </Root>));

    const { customProperty } = tree.find('g').props();

    expect(customProperty)
      .toBeTruthy();
  });
});
