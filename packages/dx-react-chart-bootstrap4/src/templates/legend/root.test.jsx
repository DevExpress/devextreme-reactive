import * as React from 'react';
import { shallow } from 'enzyme';
import { Root } from './root';

describe('Root', () => {
  it('should render root as ul', () => {
    const tree = shallow((
      <Root
        x={1}
        y={2}
        refsHandler={() => {}}
      >
        <text>a</text>
      </Root>
    ));

    expect(tree.type()).toEqual('ul');
  });
});
