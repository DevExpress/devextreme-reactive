import * as React from 'react';
import { shallow } from 'enzyme';
import Popover from '@mui/material/Popover';
import { Overlay } from './overlay';

describe('Overlay', () => {
  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <Overlay
        data={{ a: 1 }}
        onHide={() => {}}
      >
        <div />
      </Overlay>
    ));

    expect(tree.find(Popover).props().data)
      .toMatchObject({ a: 1 });
  });
});
