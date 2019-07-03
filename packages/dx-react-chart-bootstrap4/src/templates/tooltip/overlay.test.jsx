import * as React from 'react';
import { shallow } from 'enzyme';
import { Overlay } from './overlay';

describe('Overlay', () => {
  const defaultProps = {
    target: 'test-target',
    rotated: false,
  };

  it('should render Popover', () => {
    const tree = shallow((
      <Overlay
        {...defaultProps}
      >
        <div className="content" />
      </Overlay>
    ));

    expect(tree.find('Popover').props()).toMatchObject({
      placement: 'top',
      isOpen: true,
      target: 'test-target',
      modifiers: {
        flip: { enabled: false },
      },
    });
    expect(tree.find('.content')).toBeTruthy();
  });

  it('should render Popover, rotated is true', () => {
    const tree = shallow((
      <Overlay
        {...defaultProps}
        rotated
      >
        <div className="content" />
      </Overlay>
    ));
    expect(tree.find('Popover').props()).toMatchObject({
      placement: 'right',
      isOpen: true,
      target: 'test-target',
      modifiers: {
        flip: { enabled: false },
      },
    });
  });
});
