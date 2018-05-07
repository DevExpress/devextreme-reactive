import * as React from 'react';
import { shallow } from 'enzyme';
import { Root } from './root';

describe('Root', () => {
  it('should render root element', () => {
    const tree = shallow((
      <Root >
        <text>a</text>
      </Root>
    ));

    const g = tree.find('g');

    expect(g.find('text').text()).toBe('a');
  });
});
