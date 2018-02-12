import * as React from 'react';
import { shallow } from 'enzyme';
import { Popover } from './popover';

describe('Popover', () => {
  it('should pass styles to the root element', () => {
    const tree = shallow((
      <Popover
        style={{ left: 100, top: 50 }}
      >
        <div />
      </Popover>
    ));

    expect(tree.prop('style'))
      .toMatchObject({ left: 100, top: 50 });
  });
});
