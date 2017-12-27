import React from 'react';
import { mount } from 'enzyme';
import { findDOMNode } from 'react-dom';
import { setupConsole } from '@devexpress/dx-testing';
import { DragSource, DropTarget } from '@devexpress/dx-react-core';
import { GROUP_ADD_MODE, GROUP_REMOVE_MODE } from '@devexpress/dx-grid-core';
import { GroupPanelLayout } from './group-panel-layout';

jest.mock('react-dom', () => ({
  findDOMNode: jest.fn(),
}));
jest.mock('@devexpress/dx-react-core', () => ({
  DragSource: jest.fn(({ children }) => children),
  DropTarget: jest.fn(({ children }) => children),
}));

const defaultProps = {
  containerComponent: ({ children }) => children,
  itemComponent: () => null,
  emptyMessageComponent: () => null,
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
    const items = [
      { column: { name: 'a' } },
      { column: { name: 'b' } },
      { column: { name: 'c' } },
      { column: { name: 'd' } },
    ];
    const tree = mount((
      <GroupPanelLayout
        {...defaultProps}
        items={items}
      />
    ));

    expect(tree.find(defaultProps.itemComponent).length)
      .toBe(items.length);
  });

  it('should render group panel with text when no grouping is specified', () => {
    const tree = mount((
      <GroupPanelLayout
        {...defaultProps}
        items={[]}
      />
    ));

    expect(tree.find(defaultProps.emptyMessageComponent).exists())
      .toBeTruthy();
  });

  describe('drag\'n\'drop grouping', () => {
    it('should render DropTarget if draggingEnabled property is true', () => {
      const items = [
        { column: { name: 'a' } },
        { column: { name: 'b' } },
        { column: { name: 'c' } },
        { column: { name: 'd' } },
      ];

      const tree = mount((
        <GroupPanelLayout
          {...defaultProps}
          items={items}
          draggingEnabled
        />
      ));

      expect(tree.find(DropTarget).exists())
        .toBeTruthy();
    });

    it('should render DragSource for each item of draggingEnabled is true', () => {
      const items = [
        { column: { name: 'a' } },
        { column: { name: 'b' } },
        { column: { name: 'c' } },
        { column: { name: 'd' } },
      ];

      const tree = mount((
        <GroupPanelLayout
          {...defaultProps}
          items={items}
          draggingEnabled
        />
      ));

      expect(tree.find(DragSource).find(defaultProps.itemComponent).length)
        .toBe(items.length);
    });

    it('should call onDraftGroup when dragging a column over the group panel', () => {
      const onDraftGroup = jest.fn();
      const column = { name: 'a' };

      const tree = mount((
        <GroupPanelLayout
          {...defaultProps}
          items={[]}
          onDraftGroup={onDraftGroup}
          draggingEnabled
        />
      ));

      const dropTarget = tree.find(DropTarget);
      dropTarget.prop('onEnter')({
        payload: [{ type: 'column', columnName: column.name }],
        clientOffset: { x: 170, y: 20 },
      });
      dropTarget.prop('onOver')({
        payload: [{ type: 'column', columnName: column.name }],
        clientOffset: { x: 175, y: 20 },
      });

      expect(onDraftGroup)
        .toHaveBeenCalledWith({
          columnName: column.name,
          groupIndex: 0,
        });
    });

    it('should call onDraftGroup on drag leave from Group panel', () => {
      const onDraftGroup = jest.fn();
      const onCancelDraftGroup = jest.fn();
      const column = { name: 'a' };

      const tree = mount((
        <GroupPanelLayout
          {...defaultProps}
          items={[{ column, draft: GROUP_REMOVE_MODE }]}
          onDraftGroup={onDraftGroup}
          onCancelDraftGroup={onCancelDraftGroup}
          draggingEnabled
        />
      ));

      const dropTarget = tree.find(DropTarget);
      dropTarget.prop('onEnter')({
        payload: [{ type: 'column', columnName: column.name }],
        clientOffset: { x: 170, y: 20 },
      });
      dropTarget.prop('onLeave')({
        payload: [{ type: 'column', columnName: column.name }],
        clientOffset: { x: 175, y: 60 },
      });

      expect(onDraftGroup)
        .toHaveBeenCalledWith({
          columnName: column.name,
          groupIndex: -1,
        });
      expect(onCancelDraftGroup)
        .toHaveBeenCalledTimes(0);
    });

    it('should apply grouping and reset grouping change on drop', () => {
      const column = { name: 'a' };
      const onGroup = jest.fn();
      const onCancelDraftGroup = jest.fn();

      const tree = mount((
        <GroupPanelLayout
          {...defaultProps}
          items={[]}
          columns={[column]}
          onGroup={onGroup}
          onCancelDraftGroup={onCancelDraftGroup}
          draggingEnabled
        />
      ));

      const dropTarget = tree.find(DropTarget);
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

      expect(onGroup)
        .toHaveBeenCalledTimes(1);
      expect(onGroup)
        .toHaveBeenCalledWith({ columnName: column.name, groupIndex: 0 });

      expect(onCancelDraftGroup)
        .toHaveBeenCalledTimes(1);
    });

    it('should apply grouping and reset grouping change on drag end', () => {
      findDOMNode.mockImplementation(() => ({
        getBoundingClientRect: () => ({}),
      }));
      const column = { name: 'a' };
      const onGroup = jest.fn();
      const onCancelDraftGroup = jest.fn();

      const tree = mount((
        <GroupPanelLayout
          {...defaultProps}
          items={[{ column }]}
          onGroup={onGroup}
          onCancelDraftGroup={onCancelDraftGroup}
          draggingEnabled
        />
      ));

      const dropTarget = tree.find(DropTarget);
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

      const dragSource = tree.find(DragSource);
      dragSource.prop('onEnd')();

      expect(onGroup)
        .toHaveBeenCalledTimes(1);
      expect(onGroup)
        .toHaveBeenCalledWith({ columnName: column.name });

      expect(onCancelDraftGroup)
        .toHaveBeenCalledTimes(1);
    });

    it('should call onCancelDraftGroup on drag leave when the draft is "add"', () => {
      const column = { name: 'a' };
      const onCancelDraftGroup = jest.fn();
      const onDraftGroup = jest.fn();
      const tree = mount((
        <GroupPanelLayout
          {...defaultProps}
          items={[{ column, draft: GROUP_ADD_MODE }]}
          onCancelDraftGroup={onCancelDraftGroup}
          onDraftGroup={onDraftGroup}
          draggingEnabled
        />
      ));

      const dropTarget = tree.find(DropTarget);

      dropTarget.prop('onEnter')({
        payload: [{ type: 'column', columnName: column.name }],
        clientOffset: { x: 170, y: 20 },
      });
      dropTarget.prop('onLeave')({
        payload: [{ type: 'column', columnName: column.name }],
        clientOffset: { x: 175, y: 20 },
      });

      expect(onCancelDraftGroup)
        .toHaveBeenCalledTimes(1);
      expect(onDraftGroup)
        .toHaveBeenCalledTimes(0);
    });
  });
});
