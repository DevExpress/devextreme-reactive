import React from 'react';
import { mount } from 'enzyme';

import { setupConsole } from '@devexpress/dx-testing';
import { DragDropContext } from '@devexpress/dx-react-core';

import { GroupPanelLayout } from './group-panel-layout';

const groupPanelCellTemplate = () => (
  <div
    className="cell"
  />
);
// eslint-disable-next-line react/prop-types
const panelTemplate = ({ cells }) => <div>{cells}</div>;

describe('GroupPanelLayout', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
  });


  it('should render group panel with cells', () => {
    const groupedColumns = [
      { name: 'a' },
      { name: 'b' },
      { name: 'c' },
      { name: 'd' },
    ];
    const tree = mount(
      <GroupPanelLayout
        groupedColumns={groupedColumns}
        groupPanelCellTemplate={groupPanelCellTemplate}
        panelTemplate={panelTemplate}
      />,
    );

    expect(tree.find('.cell').length)
      .toBe(groupedColumns.length);
  });

  it('should render group panel with text when no grouping is specified', () => {
    const groupByColumnText = 'no items';
    const tree = mount(
      <GroupPanelLayout
        groupedColumns={[]}
        groupByColumnText={groupByColumnText}
        groupPanelCellTemplate={groupPanelCellTemplate}
        panelTemplate={panelTemplate}
      />,
    );

    expect(tree.text())
      .toBe(groupByColumnText);
  });

  it('should pass correct sorting parameters to cell template', () => {
    const groupedColumns = [{ name: 'a' }, { name: 'b' }];
    const sorting = [{ columnName: 'a', direction: 'desc' }];
    const cellTemplate = jest.fn().mockImplementation(groupPanelCellTemplate);
    mount(
      <GroupPanelLayout
        groupedColumns={groupedColumns}
        allowSorting
        sorting={sorting}
        groupPanelCellTemplate={cellTemplate}
        panelTemplate={panelTemplate}
      />,
    );

    expect(cellTemplate.mock.calls[0][0].sortingDirection)
      .toBe('desc');
    expect(cellTemplate.mock.calls[0][0].allowSorting)
      .toBeTruthy();
    expect(cellTemplate.mock.calls[1][0].sortingDirection)
      .toBeNull();
    expect(cellTemplate.mock.calls[1][0].allowSorting)
      .toBeTruthy();
  });

  it('should pass correct sorting parameters to cell template if sorting is disabled', () => {
    const groupedColumns = [{ name: 'a' }];
    const sorting = [{ columnName: 'a', direction: 'desc' }];
    const cellTemplate = jest.fn().mockImplementation(groupPanelCellTemplate);
    mount(
      <GroupPanelLayout
        groupedColumns={groupedColumns}
        allowSorting={false}
        sorting={sorting}
        groupPanelCellTemplate={cellTemplate}
        panelTemplate={panelTemplate}
      />,
    );

    expect(cellTemplate.mock.calls[0][0].sortingDirection)
      .toBe('desc');
    expect(cellTemplate.mock.calls[0][0].allowSorting)
      .toBeFalsy();
  });

  describe('drag\'n\'drop grouping', () => {
    it('should render DropTarget if allowDragging property is true', () => {
      const groupedColumns = [
        { name: 'a' },
        { name: 'b' },
        { name: 'c' },
        { name: 'd' },
      ];
      const tree = mount(
        <DragDropContext>
          <GroupPanelLayout
            groupedColumns={groupedColumns}
            groupPanelCellTemplate={groupPanelCellTemplate}
            panelTemplate={panelTemplate}
            allowDragging
          />
        </DragDropContext>,
      );

      expect(tree.find('DropTarget').exists())
        .toBeTruthy();
    });

    it('should render DragSource for each cell of allowDragging is true', () => {
      const groupedColumns = [
        { name: 'a' },
        { name: 'b' },
        { name: 'c' },
        { name: 'd' },
      ];
      const tree = mount(
        <DragDropContext>
          <GroupPanelLayout
            groupedColumns={groupedColumns}
            groupPanelCellTemplate={groupPanelCellTemplate}
            panelTemplate={panelTemplate}
            allowDragging
          />
        </DragDropContext>,
      );

      expect(tree.find('DragSource > .cell').length)
        .toBe(groupedColumns.length);
    });

    it('should call draftGroupingChange when dragging a column over the group panel', () => {
      const draftGroupingChange = jest.fn();
      const column = { name: 'a' };
      const tree = mount(
        <DragDropContext>
          <GroupPanelLayout
            groupedColumns={[]}
            groupPanelCellTemplate={groupPanelCellTemplate}
            panelTemplate={panelTemplate}
            columns={[column]}
            draftGroupingChange={draftGroupingChange}
            allowDragging
          />
        </DragDropContext>,
      );

      const dropTarget = tree.find('DropTarget');
      dropTarget.prop('onEnter')({
        payload: [{ type: 'column', columnName: column.name }],
        clientOffset: { x: 170, y: 20 },
      });
      dropTarget.prop('onOver')({
        payload: [{ type: 'column', columnName: column.name }],
        clientOffset: { x: 175, y: 20 },
      });

      expect(draftGroupingChange)
        .toHaveBeenCalledWith({
          columnName: column.name,
          groupIndex: 0,
        });
    });

    it('should call draftGroupingChange on drag leave', () => {
      const draftGroupingChange = jest.fn();
      const column = { name: 'a' };
      const tree = mount(
        <DragDropContext>
          <GroupPanelLayout
            groupedColumns={[]}
            groupPanelCellTemplate={groupPanelCellTemplate}
            panelTemplate={panelTemplate}
            columns={[column]}
            draftGroupingChange={draftGroupingChange}
            allowDragging
          />
        </DragDropContext>,

      );

      const dropTarget = tree.find('DropTarget');
      dropTarget.prop('onEnter')({
        payload: [{ type: 'column', columnName: column.name }],
        clientOffset: { x: 170, y: 20 },
      });
      dropTarget.prop('onLeave')({
        payload: [{ type: 'column', columnName: column.name }],
        clientOffset: { x: 175, y: 60 },
      });

      expect(draftGroupingChange)
        .toHaveBeenCalledWith({
          columnName: column.name,
          groupIndex: -1,
        });
    });

    it('should apply grouping and reset grouping change on drop', () => {
      const column = { name: 'a' };
      const groupByColumn = jest.fn();
      const cancelGroupingChange = jest.fn();
      const tree = mount(
        <DragDropContext>
          <GroupPanelLayout
            groupedColumns={[]}
            groupPanelCellTemplate={groupPanelCellTemplate}
            panelTemplate={panelTemplate}
            columns={[column]}
            groupByColumn={groupByColumn}
            cancelGroupingChange={cancelGroupingChange}
            allowDragging
          />
        </DragDropContext>,
      );

      const dropTarget = tree.find('DropTarget');
      dropTarget.prop('onEnter')({
        payload: [{ type: 'column', columnName: column.name }],
        clientOffset: { x: 170, y: 20 },
      });
      dropTarget.prop('onOver')({
        payload: [{ type: 'column', columnName: column.name }],
        clientOffset: { x: 175, y: 20 },
      });
      dropTarget.prop('onDrop')({
        payload: [{ type: 'column', columnName: column.name }],
        clientOffset: { x: 175, y: 20 },
      });

      expect(groupByColumn)
        .toHaveBeenCalledTimes(1);
      expect(groupByColumn)
        .toHaveBeenCalledWith({ columnName: column.name, groupIndex: 0 });

      expect(cancelGroupingChange)
        .toHaveBeenCalledTimes(1);
    });

    it('should apply grouping and reset grouping change on drag end', () => {
      const column = { name: 'a' };
      const groupByColumn = jest.fn();
      const cancelGroupingChange = jest.fn();
      const tree = mount(
        <DragDropContext>
          <GroupPanelLayout
            columns={[column]}
            groupedColumns={[column]}
            groupPanelCellTemplate={groupPanelCellTemplate}
            panelTemplate={panelTemplate}
            groupByColumn={groupByColumn}
            cancelGroupingChange={cancelGroupingChange}
            allowDragging
          />
        </DragDropContext>,
      );

      const dragSource = tree.find('DragSource');
      dragSource.prop('onStart')();

      const dropTarget = tree.find('DropTarget');
      dropTarget.prop('onEnter')({
        payload: [{ type: 'column', columnName: column.name }],
        clientOffset: { x: 170, y: 20 },
      });
      dropTarget.prop('onOver')({
        payload: [{ type: 'column', columnName: column.name }],
        clientOffset: { x: 175, y: 20 },
      });
      dropTarget.prop('onLeave')({
        payload: [{ type: 'column', columnName: column.name }],
        clientOffset: { x: 175, y: 20 },
      });

      dragSource.prop('onEnd')();

      expect(groupByColumn)
        .toHaveBeenCalledTimes(1);
      expect(groupByColumn)
        .toHaveBeenCalledWith({ columnName: column.name });

      expect(cancelGroupingChange)
        .toHaveBeenCalledTimes(1);
    });
  });
});
