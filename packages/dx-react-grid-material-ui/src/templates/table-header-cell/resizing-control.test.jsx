import * as React from 'react';
import { createShallow, getClasses } from '@devexpress/dx-testing';
import { setupConsole } from '@devexpress/dx-testing';
import { Draggable } from '@devexpress/dx-react-core';
import { ResizingControl } from './resizing-control';

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
  let classes;
  beforeAll(() => {
    resetConsole = setupConsole();
    shallow = createShallow({ untilSelector: 'ResizingControlBase' });
    classes = getClasses(<ResizingControl {...defaultProps} />);
  });
  afterAll(() => {
    resetConsole();
    shallow.cleanUp();
  });

  it('should have correct styles while resizing', () => {
    const tree = shallow(<ResizingControl {...defaultProps} />);

    expect(tree.find(`.${classes.resizeHandle}`).exists()).toBeTruthy();

    tree.find(Draggable).prop('onStart')({ x: 0, y: 0 });
    tree.update();
    expect(tree.find(`.${classes.resizeHandle}`).hasClass(classes.resizeHandleActive)).toBeTruthy();

    tree.find(Draggable).prop('onEnd')({ x: 0, y: 0 });
    tree.update();
    expect(tree.find(`.${classes.resizeHandle}`).hasClass(classes.resizeHandleActive)).toBeFalsy();
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
});
