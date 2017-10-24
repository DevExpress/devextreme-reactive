import React from 'react';
import { createMount, getClasses } from 'material-ui/test-utils';
import { setupConsole } from '@devexpress/dx-testing';
import { Draggable } from '@devexpress/dx-react-core';
import { ResizingControl } from './resizing-control';

const defaultProps = {
  changeColumnWidth: () => {},
  changeDraftColumnWidth: () => {},
};

describe('ResizingControl', () => {
  let resetConsole;
  let mount;
  let classes;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['SheetsRegistry'] });
    mount = createMount();
    classes = getClasses(<ResizingControl {...defaultProps} />);
  });
  afterAll(() => {
    resetConsole();
    mount.cleanUp();
  });

  it('should have correct styles while resizing', () => {
    const tree = mount(<ResizingControl {...defaultProps} />);

    const handle = tree.find(`.${classes.resizeHandle}`);
    expect(handle.exists()).toBeTruthy();

    tree.find(Draggable).prop('onStart')({ x: 0, y: 0 });
    expect(handle.hasClass(classes.resizeHandleActive)).toBeTruthy();

    tree.find(Draggable).prop('onEnd')({ x: 0, y: 0 });
    expect(handle.hasClass(classes.resizeHandleActive)).toBeFalsy();
  });

  it('should trigger changeColumnWidth with correct change on resize end', () => {
    const changeColumnWidth = jest.fn();
    const tree = mount((
      <ResizingControl
        {...defaultProps}
        changeColumnWidth={changeColumnWidth}
      />
    ));

    tree.find(Draggable).prop('onStart')({ x: 0 });

    tree.find(Draggable).prop('onEnd')({ x: 10 });
    expect(changeColumnWidth)
      .toBeCalledWith({ shift: 10 });
  });

  it('should trigger changeDraftColumnWidth with correct change on resize update', () => {
    const changeDraftColumnWidth = jest.fn();
    const tree = mount((
      <ResizingControl
        {...defaultProps}
        changeDraftColumnWidth={changeDraftColumnWidth}
      />
    ));

    tree.find(Draggable).prop('onStart')({ x: 0 });

    tree.find(Draggable).prop('onUpdate')({ x: 10 });
    expect(changeDraftColumnWidth)
      .toBeCalledWith({ shift: 10 });
  });
});
