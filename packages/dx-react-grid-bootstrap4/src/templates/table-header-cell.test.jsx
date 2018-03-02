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

  it('should use column name if title is not specified', () => {
    const tree = shallow((
      <TableHeaderCell
        column={{
          name: 'Test',
        }}
      />
    ));

    expect(tree.find('th > div').text()).toBe('Test');
  });

  it('should have correct classes when user interaction disallowed', () => {
    const tree = shallow((
      <TableHeaderCell
        column={{}}
      />
    ));

    expect(tree.find('th').is('.dx-rg-bs4-user-select-none.dx-rg-bs4-cursor-pointer'))
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

    expect(tree.find('th').is('.dx-rg-bs4-user-select-none.dx-rg-bs4-cursor-pointer.position-relative'))
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

    expect(tree.dive().find('th').is('.dx-rg-bs4-user-select-none.dx-rg-bs4-cursor-pointer.position-relative'))
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

    expect(tree.find('th').is('.dx-rg-bs4-inactive'))
      .toBeFalsy();

    tree.find(DragSource).prop('onStart')();
    tree.update();

    expect(tree.find('th').is('.dx-rg-bs4-inactive'))
      .toBeTruthy();

    tree.find(DragSource).prop('onEnd')();
    tree.update();

    expect(tree.find('th').is('.dx-rg-bs4-inactive'))
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

  it('should have correct classes when grouping by click is not allowed and column align is left', () => {
    const tree = shallow((
      <TableHeaderCell
        column={{}}
        showGroupingControls={false}
      />
    ));
    expect(tree.find('div').is('.text-nowrap.dx-rg-bs4-table-header-cell-wrapper'))
      .toBeTruthy();
    expect(tree.find('div').is('.text-right'))
      .toBeFalsy();
  });

  it('should have correct classes when grouping by click is allowed and column align is left', () => {
    const tree = shallow((
      <TableHeaderCell
        column={{}}
        showGroupingControls
      />
    ));
    expect(tree.find('div').is('.text-nowrap.dx-rg-bs4-table-header-cell-wrapper.dx-rg-bs4-table-header-cell-left'))
      .toBeTruthy();
    expect(tree.find('div').is('.text-right'))
      .toBeFalsy();
  });

  it('should have correct classes when grouping by click is not allowed and column align is right', () => {
    const tree = shallow((
      <TableHeaderCell
        tableColumn={{ align: 'right' }}
        showGroupingControls={false}
      />
    ));
    expect(tree.find('div').is('.text-nowrap.text-right'))
      .toBeTruthy();
    expect(tree.find('div').is('.dx-rg-bs4-table-header-cell-right'))
      .toBeFalsy();
  });

  it('should have correct classes when grouping by click is allowed and column align is right', () => {
    const tree = shallow((
      <TableHeaderCell
        tableColumn={{ align: 'right' }}
        showGroupingControls
      />
    ));
    expect(tree.find('div').is('.text-nowrap.text-right.dx-rg-bs4-table-header-cell-right'))
      .toBeTruthy();
  });

  it('should pass custom class to the root element', () => {
    const tree = shallow((
      <TableHeaderCell
        column={{ title: 'a' }}
        className="custom-class"
      />
    ));

    expect(tree.find('th').is('.position-relative.custom-class'))
      .toBeTruthy();
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <TableHeaderCell column={{ title: 'a' }} data={{ a: 1 }} />
    ));
    expect(tree.props().data)
      .toMatchObject({ a: 1 });
  });

  describe('with keyboard navigation', () => {
    const ENTER_KEY_CODE = 13;
    const SPACE_KEY_CODE = 32;

    it('should handle the "Enter" and "Space" keys down', () => {
      const onSort = jest.fn();
      const tree = shallow((
        <TableHeaderCell
          onSort={onSort}
          column={{ title: 'test' }}
          tableColumn={{ align: 'right' }}
          showSortingControls
          sortingEnabled
        />
      ));

      const targetElement = tree.find('th');
      targetElement.simulate('click', { keyCode: ENTER_KEY_CODE, preventDefault: jest.fn() });
      expect(onSort)
        .toHaveBeenCalled();

      onSort.mockClear();
      targetElement.simulate('click', { keyCode: SPACE_KEY_CODE, preventDefault: jest.fn() });
      expect(onSort)
        .toHaveBeenCalled();

      onSort.mockClear();
      targetElement.simulate('click', { keyCode: 51 });
      expect(onSort)
        .not.toHaveBeenCalled();
    });

    it('should keep other sorting parameters on sorting change when the "Shift" key is pressed', () => {
      const onSort = jest.fn();
      const tree = shallow((
        <TableHeaderCell
          onSort={onSort}
          column={{ title: 'test' }}
          tableColumn={{ align: 'right' }}
          showSortingControls
          sortingEnabled
        />
      ));

      const targetElement = tree.find('th');
      targetElement.simulate('click', { keyCode: ENTER_KEY_CODE, shiftKey: true, preventDefault: jest.fn() });
      expect(onSort)
        .toHaveBeenCalledWith({ keepOther: true, direction: undefined });
    });

    it('should handle the "Ctrl" key with sorting', () => {
      const onSort = jest.fn();
      const tree = shallow((
        <TableHeaderCell
          onSort={onSort}
          column={{ title: 'test' }}
          tableColumn={{ align: 'right' }}
          sortingEnabled
          showSortingControls
        />
      ));

      const targetElement = tree.find('th');
      targetElement.simulate('click', { keyCode: ENTER_KEY_CODE, ctrlKey: true, preventDefault: jest.fn() });
      expect(onSort)
        .toHaveBeenCalledWith({ keepOther: true, direction: null });
    });
  });
});
