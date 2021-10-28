import * as React from 'react';
import Popper from '@mui/material/Popper';
import { createMount } from '@devexpress/dx-testing';
import { Overlay, classes } from './overlay';

describe('Overlay', () => {
  const ArrowComponent = () => null;

  const defaultProps = {
    target: {},
    rotated: false,
    arrowComponent: ArrowComponent,
  };
  let mount;

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
    });
    expect(tree.find(Popper).is(`.${classes.popper}`)).toBeTruthy();
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
    expect(tree.find(Popper).is(`.${classes.popper}`)).toBeTruthy();
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
    });
    expect(tree.find(Popper).is(`.${classes.popper}`)).toBeTruthy();
    expect(tree.find(ArrowComponent).props()).toMatchObject({
      placement: 'right',
    });
    expect(tree.find('.content').exists()).toBeTruthy();
  });
});
