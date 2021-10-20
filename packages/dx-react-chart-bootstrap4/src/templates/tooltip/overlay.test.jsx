import * as React from 'react';
import { create } from 'react-test-renderer';
import * as mockReactDOM from 'react-dom';
import { Overlay } from './overlay';
import { Popover } from '../../../../dx-react-bootstrap4/components';

jest.mock('react-dom', () => ({
  ...mockReactDOM,
  createPortal: jest.fn(element => element),
}));

describe('Overlay', () => {
  const defaultProps = {
    target: 'test-target',
    rotated: false,
  };

  it('should render Popover', () => {
    const tree = create((
      <Overlay {...defaultProps}>
        <div className="content" />
      </Overlay>
    ));

    expect(tree.root.findByType(Popover).props).toMatchObject({
      placement: 'top',
      isOpen: true,
      target: 'test-target',
      modifiers: {
        flip: { enabled: false },
      },
    });
    expect(tree.root.findByProps({ className: 'content' })).toBeTruthy();
  });

  it('should render Popover, rotated is true', () => {
    const tree = create((
      <Overlay
        {...defaultProps}
        rotated
      >
        <div className="content" />
      </Overlay>
    ));
    expect(tree.root.findByType(Popover).props).toMatchObject({
      placement: 'right',
      isOpen: true,
      target: 'test-target',
      modifiers: {
        flip: { enabled: false },
      },
    });
  });
});
