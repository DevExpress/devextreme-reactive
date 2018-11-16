import * as React from 'react';
import { shallow } from 'enzyme';
import { Overlay } from './overlay';

describe('Overlay', () => {
  const defaultProps = {
    target: () => {},
  };

  it('should render Popover', () => {
    const tree = shallow((
      <Overlay
        {...defaultProps}
      >
        <div className="content" />
      </Overlay>
    ));

    expect(tree.find('.content')).toBeTruthy();
  });
});
