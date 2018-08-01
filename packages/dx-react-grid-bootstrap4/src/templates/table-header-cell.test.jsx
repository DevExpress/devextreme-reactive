import * as React from 'react';
import { mount, shallow } from 'enzyme';
import { DragDropProvider, DragSource } from '@devexpress/dx-react-core';
import { setupConsole } from '@devexpress/dx-testing';

import { TableHeaderCell } from './table-header-cell';
import { ResizingControl } from './table-header-cell/resizing-control';
import { GroupingControl } from './table-header-cell/grouping-control';

jest.mock('./table-header-cell/grouping-control', () => ({
  GroupingControl: jest.fn(),
}));

describe('TableHeaderCell', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
  });
  beforeEach(() => {
    GroupingControl.mockImplementation(() => null);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should have correct classes when user interaction disallowed', () => {
    const tree = shallow((
      <TableHeaderCell
        column={{}}
      />
    ));

    expect(tree.find('th').is('.dx-g-bs4-user-select-none.dx-g-bs4-cursor-pointer'))
      .toBeFalsy();
  });

  it('should have correct classes when sorting is allowed', () => {
    const tree = shallow((
      <TableHeaderCell
        column={{ name: 'a' }}
        sortingEnabled
        showSortingControls
      />
    ));

    expect(tree.find('th').is('.dx-g-bs4-user-select-none.position-relative'))
      .toBeTruthy();
  });

  it('should have correct classes when dragging is allowed', () => {
    const tree = shallow((
      <DragDropProvider>
        <TableHeaderCell
          column={{ name: 'a' }}
          draggingEnabled
        />
      </DragDropProvider>
    ));

    expect(tree.dive().find('th').is('.dx-g-bs4-user-select-none.dx-g-bs4-cursor-pointer.position-relative'))
      .toBeTruthy();
  });

  it('should have correct classes when dragging', () => {
    const tree = mount((
      <DragDropProvider>
        <TableHeaderCell
          column={{ name: 'a' }}
          draggingEnabled
        />
      </DragDropProvider>
    ));

    expect(tree.find('th').is('.dx-g-bs4-inactive'))
      .toBeFalsy();

    tree.find(DragSource).prop('onStart')();
    tree.update();

    expect(tree.find('th').is('.dx-g-bs4-inactive'))
      .toBeTruthy();

    tree.find(DragSource).prop('onEnd')();
    tree.update();

    expect(tree.find('th').is('.dx-g-bs4-inactive'))
      .toBeFalsy();
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

    expect(tree.find(ResizingControl).exists())
      .toBeTruthy();
    expect(tree.find(ResizingControl).prop('onWidthChange'))
      .toBe(onWidthChange);
    expect(tree.find(ResizingControl).prop('onWidthDraft'))
      .toBe(onWidthDraft);
    expect(tree.find(ResizingControl).prop('onWidthDraftCancel'))
      .toBe(onWidthDraftCancel);
  });

  it('should have correct classes when column is aligned by left', () => {
    const tree = shallow((
      <TableHeaderCell
        column={{}}
        showGroupingControls={false}
      />
    ));

    expect(tree.find('div').at(1).is('.text-nowrap.dx-g-bs4-table-header-cell-wrapper'))
      .toBeTruthy();
    expect(tree.find('div').at(1).is('.text-right'))
      .toBeFalsy();
  });


  it('should have correct classes when column is aligned by right', () => {
    const tree = shallow((
      <TableHeaderCell
        tableColumn={{ align: 'right' }}
        showGroupingControls={false}
      />
    ));

    expect(tree.find('div').at(1).is('.text-nowrap.text-right'))
      .toBeTruthy();
  });

  it('should have correct classes when column is aligned by center', () => {
    const tree = shallow((
      <TableHeaderCell
        tableColumn={{ align: 'center' }}
      />
    ));

    expect(tree.find('div').at(1).is('.text-nowrap.text-center'))
      .toBeTruthy();
  });

  it('should pass custom class to the root element', () => {
    const tree = shallow((
      <TableHeaderCell
        column={{ title: 'a' }}
        className="custom-class"
      />
    ));

    expect(tree.find('th').is('.position-relative.dx-g-bs4-header-cell.custom-class'))
      .toBeTruthy();
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <TableHeaderCell column={{ title: 'a' }} data={{ a: 1 }} />
    ));
    expect(tree.props().data)
      .toMatchObject({ a: 1 });
  });

  it('should consider the `wordWrapEnabled` property', () => {
    let tree = shallow(<TableHeaderCell />);
    expect(tree.find('div').at(1).is('.text-nowrap'))
      .toBeTruthy();

    tree = shallow(<TableHeaderCell tableColumn={{ wordWrapEnabled: true }} />);
    expect(tree.find('div').at(1).is('.text-nowrap'))
      .toBeFalsy();
  });
});
