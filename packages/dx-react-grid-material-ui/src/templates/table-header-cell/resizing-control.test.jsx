import React from 'react';
import { createMount, getClasses } from 'material-ui/test-utils';
import { setupConsole } from '@devexpress/dx-testing';
import { Draggable } from '@devexpress/dx-react-core';
import { ResizingControl } from './resizing-control';

const defaultProps = {
  onWidthChange: () => {},
  onDraftWidthChange: () => {},
};

describe('ResizingControl', () => {
  let resetConsole;
  let mount;
  let classes;
  beforeAll(() => {
    resetConsole = setupConsole();
    mount = createMount();
    classes = getClasses(<ResizingControl {...defaultProps} />);
  });
  afterAll(() => {
    resetConsole();
    mount.cleanUp();
  });

  it('should have correct styles while resizing', () => {
    const tree = mount(<ResizingControl {...defaultProps} />);

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
    const tree = mount((
      <ResizingControl
        {...defaultProps}
        onWidthChange={onWidthChange}
      />
    ));

    tree.find(Draggable).prop('onStart')({ x: 0 });
    tree.find(Draggable).prop('onEnd')({ x: 10 });
    expect(onWidthChange)
      .toBeCalledWith({ shift: 10 });
  });

  it('should trigger onDraftWidthChange with correct change on resize update', () => {
    const onDraftWidthChange = jest.fn();
    const tree = mount((
      <ResizingControl
        {...defaultProps}
        onDraftWidthChange={onDraftWidthChange}
      />
    ));

    tree.find(Draggable).prop('onStart')({ x: 0 });
    tree.find(Draggable).prop('onUpdate')({ x: 10 });
    expect(onDraftWidthChange)
      .toBeCalledWith({ shift: 10 });
  });
});
