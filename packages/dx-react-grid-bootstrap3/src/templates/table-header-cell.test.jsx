import React from 'react';
import { mount } from 'enzyme';
import { DragDropContext, DragSource } from '@devexpress/dx-react-core';
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
    const tree = mount((
      <TableHeaderCell
        column={{
          name: 'Test',
        }}
      />
    ));

    expect(tree.find('th > div').text()).toBe('Test');
  });

  it('should have correct styles when user interaction disallowed', () => {
    const tree = mount((
      <TableHeaderCell
        column={{}}
      />
    ));

    expect(tree.find('th').prop('style'))
      .not.toMatchObject({
        userSelect: 'none',
        MozUserSelect: 'none',
        WebkitUserSelect: 'none',
      });

    expect(tree.find('th').prop('style').cursor)
      .toBeUndefined();
  });

  it('should have correct styles when sorting is allowed', () => {
    const tree = mount((
      <TableHeaderCell
        column={{ name: 'a' }}
        allowSorting
      />
    ));

    expect(tree.find('th').prop('style'))
      .toMatchObject({
        userSelect: 'none',
        MozUserSelect: 'none',
        WebkitUserSelect: 'none',
        cursor: 'pointer',
      });
  });

  it('should have correct styles when dragging is allowed', () => {
    const tree = mount((
      <DragDropContext>
        <TableHeaderCell
          column={{}}
          allowDragging
        />
      </DragDropContext>
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
    const tree = mount((
      <DragDropContext>
        <TableHeaderCell
          column={{}}
          allowDragging
        />
      </DragDropContext>
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

  it('should render resize control if resize allowed', () => {
    const onColumnWidthChange = () => {};
    const onDraftColumnWidthChange = () => {};
    const tree = mount((
      <TableHeaderCell
        column={{}}
        allowResizing
        onDraftColumnWidthChange={onDraftColumnWidthChange}
        onColumnWidthChange={onColumnWidthChange}
      />
    ));

    expect(tree.find(ResizingControl).exists())
      .toBeTruthy();
    expect(tree.find(ResizingControl).prop('onDraftColumnWidthChange'))
      .toBe(onDraftColumnWidthChange);
    expect(tree.find(ResizingControl).prop('onColumnWidthChange'))
      .toBe(onColumnWidthChange);
  });

  it('should have correct styles when grouping by click is not allowed and column align is left', () => {
    const tree = mount((
      <TableHeaderCell
        column={{}}
        allowGroupingByClick={false}
      />
    ));
    expect(tree.find('th > div').prop('style'))
      .toMatchObject({
        textAlign: 'left',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      });
  });

  it('should have correct styles when grouping by click is allowed and column align is left', () => {
    const tree = mount((
      <TableHeaderCell
        column={{}}
        allowGroupingByClick
      />
    ));
    expect(tree.find('th > div').prop('style'))
      .toMatchObject({
        textAlign: 'left',
        marginRight: '14px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      });
  });

  it('should have correct styles when grouping by click is not allowed and column align is right', () => {
    const tree = mount((
      <TableHeaderCell
        column={{ align: 'right' }}
        allowGroupingByClick={false}
      />
    ));
    expect(tree.find('th > div').prop('style'))
      .toMatchObject({
        textAlign: 'right',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      });
  });

  it('should have correct styles when grouping by click is allowed and column align is right', () => {
    const tree = mount((
      <TableHeaderCell
        column={{ align: 'right' }}
        allowGroupingByClick
      />
    ));
    expect(tree.find('th > div').prop('style'))
      .toMatchObject({
        textAlign: 'right',
        marginLeft: '14px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      });
  });
  describe('with keyboard navigation', () => {
    const ENTER_KEY_CODE = 13;
    const SPACE_KEY_CODE = 32;

    it('should handle the "Enter" and "Space" keys down', () => {
      const onSortingDirectionChange = jest.fn();
      const tree = mount((
        <TableHeaderCell
          onSortingDirectionChange={onSortingDirectionChange}
          column={{ align: 'right', title: 'test' }}
          allowSorting
        />
      ));

      const targetElement = tree.find('SortingControl');
      targetElement.simulate('keydown', { keyCode: ENTER_KEY_CODE });
      expect(onSortingDirectionChange)
        .toHaveBeenCalled();

      onSortingDirectionChange.mockClear();
      targetElement.simulate('keydown', { keyCode: SPACE_KEY_CODE });
      expect(onSortingDirectionChange)
        .toHaveBeenCalled();

      onSortingDirectionChange.mockClear();
      targetElement.simulate('keydown', { keyCode: 51 });
      expect(onSortingDirectionChange)
        .not.toHaveBeenCalled();
    });

    it('should keep other sorting parameters on sorting change when the "Shift" key is pressed', () => {
      const onSortingDirectionChange = jest.fn();
      const tree = mount((
        <TableHeaderCell
          onSortingDirectionChange={onSortingDirectionChange}
          column={{ align: 'right', title: 'test' }}
          allowSorting
        />
      ));

      const targetElement = tree.find('SortingControl');
      targetElement.simulate('keydown', { keyCode: ENTER_KEY_CODE, shiftKey: true });
      expect(onSortingDirectionChange)
        .toHaveBeenCalledWith({ keepOther: true, cancel: undefined });
    });

    it('should handle the "Ctrl" key with sorting', () => {
      const onSortingDirectionChange = jest.fn();
      const tree = mount((
        <TableHeaderCell
          onSortingDirectionChange={onSortingDirectionChange}
          column={{ align: 'right', title: 'test' }}
          allowSorting
        />
      ));

      const targetElement = tree.find('SortingControl');
      targetElement.simulate('keydown', { keyCode: ENTER_KEY_CODE, ctrlKey: true });
      expect(onSortingDirectionChange)
        .toHaveBeenCalledWith({ keepOther: true, cancel: true });
    });
  });
});
