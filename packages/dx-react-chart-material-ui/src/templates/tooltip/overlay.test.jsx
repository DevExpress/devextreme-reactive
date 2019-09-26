import * as React from 'react';
import Popper from '@material-ui/core/Popper';
import { createMount, getClasses } from '@material-ui/core/test-utils';
import { Overlay } from './overlay';

describe('Overlay', () => {
  const ArrowComponent = () => null;

  const defaultProps = {
    target: {},
    rotated: false,
    arrowComponent: ArrowComponent,
  };
  let mount;
  const classes = getClasses(<Overlay {...defaultProps}>Test</Overlay>);

  beforeEach(() => {
    mount = createMount();
  });

  afterEach(() => {
    mount.cleanUp();
  });

  it('should render Popover', () => {
    const tree = mount((
      <Overlay
        {...defaultProps}
      >
        <div className="content" />
      </Overlay>
    ));

    expect(tree.find(Popper).props()).toMatchObject({
      open: true,
      anchorEl: defaultProps.target,
      placement: 'top',
      className: classes['popper-top'],
    });
    expect(tree.find(ArrowComponent).props()).toMatchObject({
      placement: 'top',
    });
    expect(tree.find('.content').exists()).toBeTruthy();
  });

  it('should pass custom class to the element', () => {
    const tree = mount((
      <Overlay
        {...defaultProps}
        className="custom-class"
      >
        <div className="content" />
      </Overlay>
    ));

    expect(tree.find(Popper).is('.custom-class')).toBeTruthy();
    expect(tree.find(Popper).is(`.${classes['popper-top']}`)).toBeTruthy();
  });

  it('should pass rest props to the root element', () => {
    const tree = mount((
      <Overlay
        {...defaultProps}
        custom={10}
      >
        <div className="content" />
      </Overlay>
    ));

    expect(tree.find(Popper).props().custom).toEqual(10);
  });

  it('should render Popover, rotated', () => {
    const tree = mount((
      <Overlay
        {...defaultProps}
        rotated
      >
        <div className="content" />
      </Overlay>
    ));

    expect(tree.find(Popper).props()).toMatchObject({
      open: true,
      anchorEl: defaultProps.target,
      placement: 'right',
      className: classes['popper-right'],
    });
    expect(tree.find(ArrowComponent).props()).toMatchObject({
      placement: 'right',
    });
    expect(tree.find('.content').exists()).toBeTruthy();
  });
});
