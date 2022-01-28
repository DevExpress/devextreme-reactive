import * as React from 'react';
import { createShallow, setupConsole } from '@devexpress/dx-testing';

import { Draggable } from '@devexpress/dx-react-core';
import { ResizingControl, classes } from './resizing-control';

const defaultProps = {
  onWidthChange: () => {},
  onWidthDraft: () => {},
  onWidthDraftCancel: () => {},
  resizeLastHandleClass: 'last-handle',
  resizeHandleOpacityClass: 'opacity',
};

describe('ResizingControl', () => {
  let resetConsole;
  let shallow;
  beforeAll(() => {
    resetConsole = setupConsole();
    shallow = createShallow();
  });
  afterAll(() => {
    resetConsole();
    shallow.cleanUp();
  });

  it('should have correct styles while resizing', () => {
    const tree = shallow(<ResizingControl {...defaultProps} />);

    expect(tree.find(`.${classes.resizeHandleLine}`).exists()).toBeTruthy();

    tree.find(Draggable).prop('onStart')({ x: 0, y: 0 });
    tree.update();
    expect(tree.find(`.${classes.resizeHandleLine}`).at(0).hasClass(classes.resizeHandleLineActive)).toBeTruthy();
    expect(tree.find(`.${classes.resizeHandleLine}`).at(1).hasClass(classes.resizeHandleLineActive)).toBeTruthy();

    tree.find(Draggable).prop('onEnd')({ x: 0, y: 0 });
    tree.update();
    expect(tree.find(`.${classes.resizeHandleLine}`).at(0).hasClass(classes.resizeHandleLineActive)).toBeFalsy();
    expect(tree.find(`.${classes.resizeHandleLine}`).at(1).hasClass(classes.resizeHandleLineActive)).toBeFalsy();
  });

  it('should trigger onWidthChange with correct change on resize end', () => {
    const onWidthChange = jest.fn();
    const onWidthDraftCancel = jest.fn();
    const tree = shallow((
      <ResizingControl
        {...defaultProps}
        onWidthChange={onWidthChange}
        onWidthDraftCancel={onWidthDraftCancel}
      />
    ));

    tree.find(Draggable).prop('onStart')({ x: 0 });
    tree.find(Draggable).prop('onEnd')({ x: 10 });
    expect(onWidthDraftCancel)
      .toBeCalled();
    expect(onWidthChange)
      .toBeCalledWith({ shift: 10 });
  });

  it('should trigger onWidthDraft with correct change on resize update', () => {
    const onWidthDraft = jest.fn();
    const tree = shallow((
      <ResizingControl
        {...defaultProps}
        onWidthDraft={onWidthDraft}
      />
    ));

    tree.find(Draggable).prop('onStart')({ x: 0 });
    tree.find(Draggable).prop('onUpdate')({ x: 10 });
    expect(onWidthDraft)
      .toBeCalledWith({ shift: 10 });
  });

  it('should not trigger onWidthDraft, x coordinate is negative value', () => {
    const onWidthDraft = jest.fn();
    const tree = shallow((
      <ResizingControl
        {...defaultProps}
        onWidthDraft={onWidthDraft}
      />
    ));

    tree.find(Draggable).prop('onStart')({ x: 0 });

    tree.find(Draggable).prop('onUpdate')({ x: -10 });
    expect(onWidthDraft).not.toBeCalled();
  });
});
