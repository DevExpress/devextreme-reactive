import * as React from 'react';
import TableCell from '@mui/material/TableCell';
import {
  createMount, createShallow, getClasses, setupConsole,
} from '@devexpress/dx-testing';

import { DragDropProvider, DragSource } from '@devexpress/dx-react-core';
import { TableHeaderCell } from './table-header-cell';
import { ResizingControl } from './table-header-cell/resizing-control';
import { CellLayout } from './table-header-cell/cell-layout';

const defaultProps = {
  column: { name: 'Test' },
  getCellWidth: () => {},
};

describe('TableHeaderCell', () => {
  let resetConsole;
  let mount;
  let shallow;
  let classes;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting', 'SheetsRegistry'] });
    classes = getClasses(<CellLayout {...defaultProps} />);
    shallow = createShallow({ dive: true });
  });
  beforeEach(() => {
    mount = createMount();
  });
  afterEach(() => {
    mount.cleanUp();
  });
  afterAll(() => {
    resetConsole();
  });

  it('should consider the `wordWrapEnabled` property', () => {
    let tree = shallow(<TableHeaderCell {...defaultProps} />);
    expect(tree.dive().prop('className'))
      .toContain(classes.cellNoWrap);

    tree = shallow(<TableHeaderCell {...defaultProps} tableColumn={{ wordWrapEnabled: true }} />);
    expect(tree.dive().prop('className'))
      .not.toContain(classes.contentNoWrap);
  });

  it('should have correct styles when user interaction disallowed', () => {
    const tree = shallow((
      <TableHeaderCell
        {...defaultProps}
      />
    ));
    const cell = tree.dive().find(TableCell);

    expect(cell.hasClass(classes.cellNoUserSelect)).toBeFalsy();
    expect(cell.hasClass(classes.cellDraggable)).toBeFalsy();
  });

  it('should have correct styles when dragging is allowed', () => {
    const tree = mount((
      <DragDropProvider>
        <TableHeaderCell
          {...defaultProps}
          draggingEnabled
        />
      </DragDropProvider>
    ));

    expect(tree.find(TableCell).hasClass(classes.cellNoUserSelect)).toBeTruthy();
    expect(tree.find(TableCell).hasClass(classes.cellDraggable)).toBeTruthy();
  });

  it('should have correct styles while dragging', () => {
    const tree = mount((
      <DragDropProvider>
        <TableHeaderCell
          {...defaultProps}
          draggingEnabled
        />
      </DragDropProvider>
    ));

    expect(tree.find(TableCell).hasClass(classes.cellDimmed)).toBeFalsy();

    tree.find(DragSource).prop('onStart')();
    tree.update();
    expect(tree.find(TableCell).hasClass(classes.cellDimmed)).toBeTruthy();

    tree.find(DragSource).prop('onEnd')();
    tree.update();
    expect(tree.find(TableCell).hasClass(classes.cellDimmed)).toBeFalsy();
  });

  it('should render resize control if resize allowed', () => {
    const onWidthChange = () => {};
    const onWidthDraft = () => {};
    const onWidthDraftCancel = () => {};
    const tree = shallow((
      <TableHeaderCell
        {...defaultProps}
        resizingEnabled
        onWidthChange={onWidthChange}
        onWidthDraft={onWidthDraft}
        onWidthDraftCancel={onWidthDraftCancel}
      />
    ));

    const resizingControl = tree.dive().find(ResizingControl);
    expect(resizingControl.exists())
      .toBeTruthy();
    expect(resizingControl.prop('onWidthChange'))
      .toBe(onWidthChange);
    expect(resizingControl.prop('onWidthDraft'))
      .toBe(onWidthDraft);
    expect(resizingControl.prop('onWidthDraftCancel'))
      .toBe(onWidthDraftCancel);
  });

  it('should pass the className prop to the root element', () => {
    const tree = shallow((
      <TableHeaderCell
        {...defaultProps}
        className="custom-class"
      />
    ));

    expect(tree.is('.custom-class'))
      .toBeTruthy();
    expect(tree.dive().is(`.${classes.cell}`))
      .toBeTruthy();
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <TableHeaderCell
        {...defaultProps}
        data={{ a: 1 }}
      />
    ));

    expect(tree.props().data)
      .toMatchObject({ a: 1 });
  });
});
