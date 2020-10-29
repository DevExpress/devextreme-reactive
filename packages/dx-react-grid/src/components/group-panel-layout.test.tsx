import * as React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { DragSource, DropTarget } from '@devexpress/dx-react-core';
import { GroupPanelLayout } from './group-panel-layout';

jest.mock('@devexpress/dx-react-core', () => ({
  DragSource: React.forwardRef(({ children }: { children: React.ReactElement }, ref) => children),
  DropTarget: jest.fn(({ children }) => children),
}));

const defaultProps = {
  containerComponent: ({ children }) => children,
  itemComponent: () => null,
  emptyMessageComponent: () => null,
  isColumnGroupingEnabled: () => true,
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

    it('should call onGroupDraft when dragging a column over the group panel', () => {
      const onGroupDraft = jest.fn();
      const column = { name: 'a' };

      const tree = mount((
        <GroupPanelLayout
          {...defaultProps}
          items={[]}
          onGroupDraft={onGroupDraft}
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

      expect(onGroupDraft)
        .toHaveBeenCalledWith({
          columnName: column.name,
          groupIndex: 0,
        });
    });

    it('should set draft when dragging', () => {
      const onGroupDraft = jest.fn();
      const onGroupDraftCancel = jest.fn();
      const column = { name: 'a' };

      const tree = mount((
        <GroupPanelLayout
          {...defaultProps}
          items={[{ column, draft: false }]}
          onGroupDraft={onGroupDraft}
          onGroupDraftCancel={onGroupDraftCancel}
          draggingEnabled
        />
      ));

      const dragSource = tree.find(DragSource);
      dragSource.prop('onStart')();
      tree.update();
      expect(tree.find(defaultProps.itemComponent).prop('item').draft)
        .toBeTruthy();

      dragSource.prop('onEnd')();
      tree.update();
      expect(tree.find(defaultProps.itemComponent).prop('item').draft)
        .toBeFalsy();
    });

    it('should call onGroupDraft on drag leave from Group panel', () => {
      const onGroupDraft = jest.fn();
      const onGroupDraftCancel = jest.fn();
      const column = { name: 'a' };

      const tree = mount((
        <GroupPanelLayout
          {...defaultProps}
          items={[{ column, draft: true }]}
          onGroupDraft={onGroupDraft}
          onGroupDraftCancel={onGroupDraftCancel}
          draggingEnabled
        />
      ));

      const dragSource = tree.find(DragSource);
      dragSource.prop('onStart')();

      const dropTarget = tree.find(DropTarget);
      dropTarget.prop('onEnter')({
        payload: [{ type: 'column', columnName: column.name }],
        clientOffset: { x: 170, y: 20 },
      });
      dropTarget.prop('onLeave')({
        payload: [{ type: 'column', columnName: column.name }],
        clientOffset: { x: 175, y: 60 },
      });

      expect(onGroupDraft)
        .toHaveBeenCalledWith({
          columnName: column.name,
          groupIndex: -1,
        });
      expect(onGroupDraftCancel)
        .toHaveBeenCalledTimes(0);
    });

    it('should apply grouping and reset grouping change on drop', () => {
      const column = { name: 'a' };
      const onGroup = jest.fn();
      const onGroupDraftCancel = jest.fn();

      const tree = mount((
        <GroupPanelLayout
          {...defaultProps}
          items={[]}
          columns={[column]}
          onGroup={onGroup}
          onGroupDraftCancel={onGroupDraftCancel}
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

      expect(onGroupDraftCancel)
        .toHaveBeenCalledTimes(1);
    });

    it('should apply grouping and reset grouping change on drag end', () => {
      const column = { name: 'a' };
      const onGroup = jest.fn();
      const onGroupDraftCancel = jest.fn();

      const tree = mount((
        <GroupPanelLayout
          {...defaultProps}
          items={[{ column }]}
          onGroup={onGroup}
          onGroupDraftCancel={onGroupDraftCancel}
          draggingEnabled
        />
      ));

      const dragSource = tree.find(DragSource);
      dragSource.prop('onStart')();

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

      dragSource.prop('onEnd')();

      expect(onGroup)
        .toHaveBeenCalledTimes(1);
      expect(onGroup)
        .toHaveBeenCalledWith({ columnName: column.name });

      expect(onGroupDraftCancel)
        .toHaveBeenCalledTimes(1);
    });

    it('should call onGroupDraftCancel on drag leave when drag is started outside', () => {
      const column = { name: 'a' };
      const onGroupDraftCancel = jest.fn();
      const onGroupDraft = jest.fn();
      const tree = mount((
        <GroupPanelLayout
          {...defaultProps}
          items={[{ column, draft: true }]}
          onGroupDraftCancel={onGroupDraftCancel}
          onGroupDraft={onGroupDraft}
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

      expect(onGroupDraftCancel)
        .toHaveBeenCalledTimes(1);
      expect(onGroupDraft)
        .toHaveBeenCalledTimes(0);
    });
  });
});
