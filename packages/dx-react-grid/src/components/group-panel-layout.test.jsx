import React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { DragDropContext } from '@devexpress/dx-react-core';
import { GROUP_ADD_MODE, GROUP_REMOVE_MODE } from '@devexpress/dx-grid-core';
import { GroupPanelLayout } from './group-panel-layout';

const defaultGroupPanelItemComponent = () => null;
const defaultProps = {
  panelComponent: ({ children }) => children,
  getGroupPanelItemComponent: () => defaultGroupPanelItemComponent,
};

describe('GroupPanelLayout', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
  });

  it('should render group panel with items', () => {
    const groupingPanelItems = [
      { column: { name: 'a' } },
      { column: { name: 'b' } },
      { column: { name: 'c' } },
      { column: { name: 'd' } },
    ];
    const tree = mount((
      <GroupPanelLayout
        {...defaultProps}
        groupingPanelItems={groupingPanelItems}
      />
    ));

    expect(tree.find(defaultGroupPanelItemComponent).length)
      .toBe(groupingPanelItems.length);
  });

  it('should render group panel with text when no grouping is specified', () => {
    const groupByColumnText = 'no items';
    const tree = mount((
      <GroupPanelLayout
        {...defaultProps}
        groupingPanelItems={[]}
        groupByColumnText={groupByColumnText}
      />
    ));

    expect(tree.text())
      .toBe(groupByColumnText);
  });

  it('should pass correct sorting parameters to item template', () => {
    const groupingPanelItems = [
      { column: { name: 'a' } },
      { column: { name: 'b' } },
    ];
    const sorting = [{ columnName: 'a', direction: 'desc' }];

    const tree = mount((
      <GroupPanelLayout
        {...defaultProps}
        groupingPanelItems={groupingPanelItems}
        allowSorting
        sorting={sorting}
      />
    ));

    expect(tree.find(defaultGroupPanelItemComponent).at(0).props())
      .toMatchObject({
        sortingDirection: 'desc',
        allowSorting: true,
      });
    expect(tree.find(defaultGroupPanelItemComponent).at(1).props())
      .toMatchObject({
        sortingDirection: null,
        allowSorting: true,
      });
  });

  it('should pass correct sorting parameters to item template if sorting is disabled', () => {
    const groupingPanelItems = [{ column: { name: 'a' } }];
    const sorting = [{ columnName: 'a', direction: 'desc' }];

    const tree = mount((
      <GroupPanelLayout
        {...defaultProps}
        groupingPanelItems={groupingPanelItems}
        allowSorting={false}
        sorting={sorting}
      />
    ));

    expect(tree.find(defaultGroupPanelItemComponent).at(0).props())
      .toMatchObject({
        sortingDirection: 'desc',
        allowSorting: false,
      });
  });

  describe('drag\'n\'drop grouping', () => {
    it('should render DropTarget if allowDragging property is true', () => {
      const groupingPanelItems = [
        { column: { name: 'a' } },
        { column: { name: 'b' } },
        { column: { name: 'c' } },
        { column: { name: 'd' } },
      ];

      const tree = mount((
        <DragDropContext>
          <GroupPanelLayout
            {...defaultProps}
            groupingPanelItems={groupingPanelItems}
            allowDragging
          />
        </DragDropContext>
      ));

      expect(tree.find('DropTarget').exists())
        .toBeTruthy();
    });

    it('should render DragSource for each item of allowDragging is true', () => {
      const groupingPanelItems = [
        { column: { name: 'a' } },
        { column: { name: 'b' } },
        { column: { name: 'c' } },
        { column: { name: 'd' } },
      ];

      const tree = mount((
        <DragDropContext>
          <GroupPanelLayout
            {...defaultProps}
            groupingPanelItems={groupingPanelItems}
            allowDragging
          />
        </DragDropContext>
      ));

      expect(tree.find('DragSource').find(defaultGroupPanelItemComponent).length)
        .toBe(groupingPanelItems.length);
    });

    it('should call draftGroupingChange when dragging a column over the group panel', () => {
      const draftGroupingChange = jest.fn();
      const column = { name: 'a' };

      const tree = mount((
        <DragDropContext>
          <GroupPanelLayout
            {...defaultProps}
            groupingPanelItems={[]}
            draftGroupingChange={draftGroupingChange}
            allowDragging
          />
        </DragDropContext>
      ));

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

    it('should call draftGroupingChange on drag leave from Group panel', () => {
      const draftGroupingChange = jest.fn();
      const cancelGroupingChange = jest.fn();
      const column = { name: 'a' };

      const tree = mount((
        <DragDropContext>
          <GroupPanelLayout
            {...defaultProps}
            groupingPanelItems={[{ column, draft: GROUP_REMOVE_MODE }]}
            draftGroupingChange={draftGroupingChange}
            cancelGroupingChange={cancelGroupingChange}
            allowDragging
          />
        </DragDropContext>
      ));

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
      expect(cancelGroupingChange)
        .toHaveBeenCalledTimes(0);
    });

    it('should apply grouping and reset grouping change on drop', () => {
      const column = { name: 'a' };
      const groupByColumn = jest.fn();
      const cancelGroupingChange = jest.fn();

      const tree = mount((
        <DragDropContext>
          <GroupPanelLayout
            {...defaultProps}
            groupingPanelItems={[]}
            columns={[column]}
            groupByColumn={groupByColumn}
            cancelGroupingChange={cancelGroupingChange}
            allowDragging
          />
        </DragDropContext>
      ));

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

      const tree = mount((
        <DragDropContext>
          <GroupPanelLayout
            {...defaultProps}
            groupingPanelItems={[{ column }]}
            groupByColumn={groupByColumn}
            cancelGroupingChange={cancelGroupingChange}
            allowDragging
          />
        </DragDropContext>
      ));

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

    it('should call cancelGroupingChange on drag leave when the draft is "add"', () => {
      const column = { name: 'a' };
      const cancelGroupingChange = jest.fn();
      const draftGroupingChange = jest.fn();
      const tree = mount((
        <DragDropContext>
          <GroupPanelLayout
            {...defaultProps}
            groupingPanelItems={[{ column, draft: GROUP_ADD_MODE }]}
            cancelGroupingChange={cancelGroupingChange}
            draftGroupingChange={draftGroupingChange}
            allowDragging
          />
        </DragDropContext>
      ));

      const dropTarget = tree.find('DropTarget');

      dropTarget.prop('onEnter')({
        payload: [{ type: 'column', columnName: column.name }],
        clientOffset: { x: 170, y: 20 },
      });
      dropTarget.prop('onLeave')({
        payload: [{ type: 'column', columnName: column.name }],
        clientOffset: { x: 175, y: 20 },
      });

      expect(cancelGroupingChange)
        .toHaveBeenCalledTimes(1);
      expect(draftGroupingChange)
        .toHaveBeenCalledTimes(0);
    });
  });
});
