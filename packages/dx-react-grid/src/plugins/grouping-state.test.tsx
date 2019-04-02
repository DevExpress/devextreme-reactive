import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import {
  pluginDepsToComponents,
  getComputedState,
  executeComputedAction,
  testStatePluginField,
  setupConsole,
} from '@devexpress/dx-testing';
import {
  changeColumnGrouping,
  toggleExpandedGroups,
  draftColumnGrouping,
  cancelColumnGroupingDraft,
  getColumnExtensionValueGetter,
  adjustSortIndex,
} from '@devexpress/dx-grid-core';
import { GroupingState } from './grouping-state';

jest.mock('@devexpress/dx-grid-core', () => ({
  changeColumnGrouping: jest.fn(),
  toggleExpandedGroups: jest.fn(),
  draftColumnGrouping: jest.fn(),
  cancelColumnGroupingDraft: jest.fn(),
  getColumnExtensionValueGetter: jest.fn(),
  adjustSortIndex: jest.fn(),
}));

const defaultDeps = {
  getter: {
    rows: [{ id: 1 }],
    getRowId: row => row.id,
  },
};

describe('GroupingState', () => {
  let resetConsole;

  beforeAll(() => {
    resetConsole = setupConsole();
  });
  afterAll(() => {
    resetConsole();
  });

  beforeEach(() => {
    changeColumnGrouping.mockImplementation(() => {});
    toggleExpandedGroups.mockImplementation(() => {});
    draftColumnGrouping.mockImplementation(() => {});
    cancelColumnGroupingDraft.mockImplementation(() => {});
    getColumnExtensionValueGetter.mockImplementation(() => () => {});
    adjustSortIndex.mockImplementation(() => 0);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  testStatePluginField({
    defaultDeps,
    Plugin: GroupingState,
    propertyName: 'grouping',
    values: [
      [{ columnName: 'a' }],
      [{ columnName: 'b' }],
      [{ columnName: 'c' }],
    ],
    actions: [{
      actionName: 'changeColumnGrouping',
      reducer: changeColumnGrouping,
      fieldReducer: false,
    }],
  });

  testStatePluginField({
    defaultDeps,
    Plugin: GroupingState,
    propertyName: 'expandedGroups',
    values: [
      ['A'],
      ['B'],
      ['C'],
    ],
    actions: [{
      actionName: 'toggleGroupExpanded',
      reducer: toggleExpandedGroups,
      fieldReducer: false,
    }, {
      actionName: 'changeColumnGrouping',
      reducer: changeColumnGrouping,
      fieldReducer: false,
    }],
  });

  describe('draftGrouping', () => {
    it('should provide draftGrouping getter', () => {
      const defaultGrouping = [{ columnName: 'a' }];

      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <GroupingState
            defaultGrouping={defaultGrouping}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).draftGrouping)
        .toBe(defaultGrouping);
    });

    // tslint:disable-next-line: max-line-length
    it('should provide draftGrouping getter based on the result of draftColumnGrouping action', () => {
      const defaultGrouping = [{ columnName: 'a' }];

      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <GroupingState
            defaultGrouping={defaultGrouping}
          />
        </PluginHost>
      ));

      const payload = { columnName: 'a' };
      draftColumnGrouping.mockImplementation(() => ({ draftGrouping: [{ columnName: 'b' }] }));
      executeComputedAction(tree, actions => actions.draftColumnGrouping(payload));

      expect(draftColumnGrouping)
        .toBeCalledWith(
          expect.objectContaining({ grouping: defaultGrouping, draftGrouping: null }),
          payload,
        );

      expect(getComputedState(tree).draftGrouping)
        .toEqual([{ columnName: 'b' }]);
    });

    // tslint:disable-next-line: max-line-length
    it('should provide draftGrouping getter based on the result of cancelColumnGroupingDraft result', () => {
      const defaultGrouping = [{ columnName: 'a' }];

      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <GroupingState
            defaultGrouping={defaultGrouping}
          />
        </PluginHost>
      ));

      const payload = { columnName: 'a' };
      cancelColumnGroupingDraft.mockImplementation(() => ({ groupingChange: 'change' }));
      executeComputedAction(tree, actions => actions.cancelColumnGroupingDraft(payload));

      expect(cancelColumnGroupingDraft)
        .toBeCalledWith(
          expect.objectContaining({ grouping: defaultGrouping, draftGrouping: null }),
          payload,
        );
    });
  });

  describe('changeColumnSorting action extending', () => {
    it('should modify changeColumnSorting action payload when sorted column is grouped', () => {
      const deps = {
        getter: {
          sorting: [],
        },
        action: {
          changeColumnSorting: jest.fn(),
        },
      };
      const defaultGrouping = [{ columnName: 'a' }];
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps, deps)}
          <GroupingState
            defaultGrouping={defaultGrouping}
          />
        </PluginHost>
      ));

      executeComputedAction(tree, actions => actions
        .changeColumnSorting({ columnName: 'a', direction: 'asc' }),
      );
      expect(adjustSortIndex).toBeCalledWith(0, defaultGrouping, []);
      expect(deps.action.changeColumnSorting.mock.calls[0][0])
        .toEqual({
          columnName: 'a',
          direction: 'asc',
          keepOther: true,
          sortIndex: 0,
        });
    });

    // tslint:disable-next-line: max-line-length
    it('should modify changeColumnSorting action payload when several grouped columns is sorted', () => {
      const defaultGrouping = [{ columnName: 'a' }, { columnName: 'b' }, { columnName: 'c' }];
      const sorting = [{ columnName: 'a' }, { columnName: 'b' }, { columnName: 'c' }];
      const deps = {
        getter: {
          sorting,
        },
        action: {
          changeColumnSorting: jest.fn(),
        },
      };
      adjustSortIndex.mockImplementation(() => 2);
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps, deps)}
          <GroupingState
            defaultGrouping={defaultGrouping}
          />
        </PluginHost>
      ));

      executeComputedAction(tree, actions => actions.changeColumnSorting({ columnName: 'c' }));
      expect(adjustSortIndex).toBeCalledWith(2, defaultGrouping, sorting);
      expect(deps.action.changeColumnSorting.mock.calls[0][0])
        .toEqual({
          columnName: 'c',
          keepOther: true,
          sortIndex: 2,
        });
    });

    // tslint:disable-next-line: max-line-length
    it('should correctly set sortIndex for changeColumnSorting action when some grouped columns is not sorted', () => {
      const defaultGrouping = [{ columnName: 'a' }, { columnName: 'b' }, { columnName: 'c' }];
      const sorting = [
        { columnName: 'a', direction: 'asc' },
        { columnName: 'c', direction: 'asc' },
      ];
      const deps = {
        getter: {
          sorting,
        },
        action: {
          changeColumnSorting: jest.fn(),
        },
      };
      adjustSortIndex.mockImplementation(() => 1);
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps, deps)}
          <GroupingState
            defaultGrouping={defaultGrouping}
          />
        </PluginHost>
      ));

      executeComputedAction(tree, actions => actions.changeColumnSorting({ columnName: 'c' }));
      expect(adjustSortIndex).toBeCalledWith(2, defaultGrouping, sorting);
      expect(deps.action.changeColumnSorting.mock.calls[0][0])
        .toEqual({
          columnName: 'c',
          keepOther: true,
          sortIndex: 1,
        });
    });

    it('should modify changeColumnSorting action payload when one grouped column is sorted', () => {
      const defaultGrouping = [{ columnName: 'a' }, { columnName: 'b' }];
      const deps = {
        getter: {
          sorting: [],
        },
        action: {
          changeColumnSorting: jest.fn(),
        },
      };

      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps, deps)}
          <GroupingState
            defaultGrouping={defaultGrouping}
          />
        </PluginHost>
      ));

      executeComputedAction(tree, actions => actions.changeColumnSorting({ columnName: 'b' }));
      expect(adjustSortIndex).toBeCalledWith(1, defaultGrouping, []);
      expect(deps.action.changeColumnSorting.mock.calls[0][0])
        .toEqual({
          columnName: 'b',
          keepOther: true,
          sortIndex: 0,
        });
    });

    it('should modify changeColumnSorting action payload when sorted column is not grouped', () => {
      const deps = {
        getter: {
          sorting: [],
        },
        action: {
          changeColumnSorting: jest.fn(),
        },
      };

      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps, deps)}
          <GroupingState
            defaultGrouping={[{ columnName: 'a' }, { columnName: 'b' }]}
          />
        </PluginHost>
      ));

      executeComputedAction(tree, actions => actions
        .changeColumnSorting({ columnName: 'c', direction: 'asc' }),
      );
      expect(deps.action.changeColumnSorting.mock.calls[0][0])
        .toEqual({
          columnName: 'c',
          direction: 'asc',
          keepOther: ['a', 'b'],
        });
    });
  });

  describe('changeColumnSorting action on changeColumnGrouping action', () => {
    it('should fire changeColumnSorting action when grouped by sorted column', () => {
      const sorting = [
        { columnName: 'b', direction: 'asc' },
        { columnName: 'a', direction: 'asc' },
      ];
      const grouping = [{ columnName: 'a' }];
      const deps = {
        getter: {
          sorting,
        },
        action: {
          changeColumnSorting: jest.fn(),
        },
      };

      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps, deps)}
          <GroupingState
            defaultGrouping={[]}
          />
        </PluginHost>
      ));

      changeColumnGrouping.mockReturnValue({ grouping });
      executeComputedAction(tree, actions => actions.changeColumnGrouping({ columnName: 'a' }));
      expect(adjustSortIndex).toBeCalledWith(0, grouping, sorting);
      expect(deps.action.changeColumnSorting.mock.calls[0][0])
        .toEqual({
          columnName: 'a',
          direction: 'asc',
          keepOther: true,
          sortIndex: 0,
        });
    });

    it('should fire changeColumnSorting action when ungrouped by sorted column', () => {
      const sorting = [
        { columnName: 'a', direction: 'asc' },
        { columnName: 'b', direction: 'asc' },
      ];
      const grouping = [{ columnName: 'b' }];
      const deps = {
        getter: {
          sorting,
        },
        action: {
          changeColumnSorting: jest.fn(),
        },
      };

      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps, deps)}
          <GroupingState
            defaultGrouping={[{ columnName: 'a' }, { columnName: 'b' }]}
          />
        </PluginHost>
      ));
      adjustSortIndex.mockImplementation(() => 1);
      changeColumnGrouping.mockReturnValue({ grouping });
      executeComputedAction(tree, actions => actions.changeColumnGrouping({ columnName: 'a' }));
      expect(adjustSortIndex).toBeCalledWith(1, grouping, sorting);
      expect(deps.action.changeColumnSorting.mock.calls[0][0])
        .toEqual({
          columnName: 'a',
          direction: 'asc',
          keepOther: true,
          sortIndex: 1,
        });
    });

    it('should correctly calculate sortIndex when some grouped columns is not sorted', () => {
      const sorting = [
        { columnName: 'a', direction: 'asc' },
        { columnName: 'c', direction: 'asc' },
      ];
      const grouping = [{ columnName: 'a' }, { columnName: 'b' }, { columnName: 'c' }];
      const deps = {
        getter: {
          sorting,
        },
        action: {
          changeColumnSorting: jest.fn(),
        },
      };

      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps, deps)}
          <GroupingState
            defaultGrouping={[{ columnName: 'a' }, { columnName: 'b' }, { columnName: 'c' }]}
          />
        </PluginHost>
      ));

      changeColumnGrouping.mockReturnValue({ grouping });
      executeComputedAction(tree, actions => actions
        .changeColumnGrouping({ columnName: 'a', groupIndex: 1 }),
      );
      expect(adjustSortIndex).toBeCalledWith(0, grouping, sorting);
      expect(deps.action.changeColumnSorting)
        .not.toBeCalled();
    });

    it('should not fire changeColumnSorting action when ungrouped last sorted column', () => {
      const deps = {
        getter: {
          sorting: [{ columnName: 'a', direction: 'asc' }],
        },
        action: {
          changeColumnSorting: jest.fn(),
        },
      };

      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps, deps)}
          <GroupingState
            defaultGrouping={[{ columnName: 'a' }]}
          />
        </PluginHost>
      ));

      changeColumnGrouping.mockReturnValue({ grouping: [] });
      executeComputedAction(tree, actions => actions.changeColumnGrouping({ columnName: 'a' }));
      expect(deps.action.changeColumnSorting)
        .not.toBeCalled();
    });

    // tslint:disable-next-line: max-line-length
    it('should not fire changeColumnSorting action when grouped column sorting index is correct', () => {
      const sorting = [
        { columnName: 'a', direction: 'asc' },
        { columnName: 'b', direction: 'asc' },
      ];
      const grouping = [{ columnName: 'a' }, { columnName: 'b' }];
      const deps = {
        getter: {
          sorting,
        },
        action: {
          changeColumnSorting: jest.fn(),
        },
      };

      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps, deps)}
          <GroupingState
            defaultGrouping={[{ columnName: 'a' }]}
          />
        </PluginHost>
      ));

      changeColumnGrouping.mockReturnValue({ grouping });
      executeComputedAction(tree, actions => actions.changeColumnGrouping({ columnName: 'a' }));
      expect(adjustSortIndex).toBeCalledWith(0, grouping, sorting);
      expect(deps.action.changeColumnSorting)
        .not.toBeCalled();
    });
  });

  describe('column extensions', () => {
    it('should call getColumnExtensionValueGetter correctly', () => {
      const columnExtensions = [{ columnName: 'a', groupingEnabled: true }];
      mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <GroupingState
            columnGroupingEnabled={false}
            columnExtensions={columnExtensions}
          />
        </PluginHost>
      ));

      expect(getColumnExtensionValueGetter)
        .toBeCalledWith(columnExtensions, 'groupingEnabled', false);
    });
  });
});
