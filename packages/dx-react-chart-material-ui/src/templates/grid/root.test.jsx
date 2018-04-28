import * as React from 'react';
import { shallow } from 'enzyme';
import { Root } from './root';

describe('Root', () => {
  it('should render root element', () => {
    const tree = shallow((
      <Root
        x={1}
        y={2}
      >
        <text>a</text>
      </Root>
    ));

    const g = tree.find('g');
    const { transform } = g.props();

    expect(transform).toBe('translate(1 2)');
    expect(g.find('text').text()).toBe('a');
  });
});
