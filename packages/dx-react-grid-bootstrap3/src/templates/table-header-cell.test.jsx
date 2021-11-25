import * as React from 'react';
import { mount, shallow } from 'enzyme';
import { DragDropProvider, DragSource } from '@devexpress/dx-react-core';
import { setupConsole } from '@devexpress/dx-testing';

import { TableHeaderCell } from './table-header-cell';
import { ResizingControl } from './table-header-cell/resizing-control';

describe('TableHeaderCell', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
  });

  it('should have correct styles when user interaction disallowed', () => {
    const tree = shallow((
      <TableHeaderCell
        column={{}}
      />
    ));
    const cell = tree.dive().find('th');

    expect(cell.prop('style'))
      .not.toMatchObject({
        userSelect: 'none',
        MozUserSelect: 'none',
        WebkitUserSelect: 'none',
      });

    expect(cell.prop('style').cursor)
      .toBeUndefined();
  });

  it('should have correct styles when dragging is allowed', () => {
    const getCellWidth = () => {};
    const tree = mount((
      <DragDropProvider>
        <TableHeaderCell
          column={{ name: 'a' }}
          draggingEnabled
          getCellWidth={getCellWidth}
        />
      </DragDropProvider>
    ));

    expect(tree.find('th').prop('style'))
      .toMatchObject({
        userSelect: 'none',
        MozUserSelect: 'none',
        WebkitUserSelect: 'none',
        cursor: 'pointer',
      });
  });

  it('should have correct styles when dragging', () => {
    const getCellWidth = () => {};
    const tree = mount((
      <DragDropProvider>
        <TableHeaderCell
          column={{ name: 'a' }}
          draggingEnabled
          getCellWidth={getCellWidth}
        />
      </DragDropProvider>
    ));

    expect(tree.find('th').prop('style'))
      .not.toMatchObject({
        opacity: 0.3,
      });

    tree.find(DragSource).prop('onStart')();
    tree.update();

    expect(tree.find('th').prop('style'))
      .toMatchObject({
        opacity: 0.3,
      });

    tree.find(DragSource).prop('onEnd')();
    tree.update();

    expect(tree.find('th').prop('style'))
      .not.toMatchObject({
        opacity: 0.3,
      });
  });

  it('should render resize control if resizing is allowed', () => {
    const onWidthChange = () => {};
    const onWidthDraft = () => {};
    const onWidthDraftCancel = () => {};

    const tree = shallow((
      <TableHeaderCell
        column={{}}
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

  it('should consider the `wordWrapEnabled` property', () => {
    let tree = shallow(<TableHeaderCell />);
    expect(tree.dive().prop('style').whiteSpace)
      .toBe('nowrap');

    tree = shallow(<TableHeaderCell tableColumn={{ wordWrapEnabled: true }} />);
    expect(tree.dive().prop('style').whiteSpace)
      .toBe('normal');
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <TableHeaderCell
        column={{ title: 'a' }}
        className="custom-class"
      />
    ));

    expect(tree.is('.custom-class'))
      .toBeTruthy();
  });
});
