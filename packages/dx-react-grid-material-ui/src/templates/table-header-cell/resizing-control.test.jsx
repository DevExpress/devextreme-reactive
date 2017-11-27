import React from 'react';
import { createMount, getClasses } from 'material-ui/test-utils';
import { setupConsole } from '@devexpress/dx-testing';
import { Draggable } from '@devexpress/dx-react-core';
import { ResizingControl } from './resizing-control';

const defaultProps = {
  onColumnResize: () => {},
  onDraftColumnResize: () => {},
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

  it('should trigger onColumnResize with correct change on resize end', () => {
    const onColumnResize = jest.fn();
    const tree = mount((
      <ResizingControl
        {...defaultProps}
        onColumnResize={onColumnResize}
      />
    ));

    tree.find(Draggable).prop('onStart')({ x: 0 });
    tree.find(Draggable).prop('onEnd')({ x: 10 });
    expect(onColumnResize)
      .toBeCalledWith({ shift: 10 });
  });

  it('should trigger onDraftColumnResize with correct change on resize update', () => {
    const onDraftColumnResize = jest.fn();
    const tree = mount((
      <ResizingControl
        {...defaultProps}
        onDraftColumnResize={onDraftColumnResize}
      />
    ));

    tree.find(Draggable).prop('onStart')({ x: 0 });
    tree.find(Draggable).prop('onUpdate')({ x: 10 });
    expect(onDraftColumnResize)
      .toBeCalledWith({ shift: 10 });
  });
});
