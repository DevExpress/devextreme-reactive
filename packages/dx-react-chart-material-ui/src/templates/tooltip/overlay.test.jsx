import * as React from 'react';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import { createMount, getClasses } from '@material-ui/core/test-utils';
import { Overlay } from './overlay';

describe('Overlay', () => {
  const defaultProps = {
    target: {},
    rotated: false,
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
      className: classes.popper,
    });
    expect(tree.find(Paper).props()).toMatchObject({
      className: classes.paper,
    });
    expect(tree.find('div').get(3).props).toMatchObject({
      className: classes.arrow,
    });
    expect(tree.find('.content').exists()).toBeTruthy();
  });

  it('should pass custom class to the root element', () => {
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
      className: classes.popperRotated,
    });
    expect(tree.find('div').get(3).props).toMatchObject({
      className: classes.arrowRotated,
    });
    expect(tree.find('.content').exists()).toBeTruthy();
  });
});
