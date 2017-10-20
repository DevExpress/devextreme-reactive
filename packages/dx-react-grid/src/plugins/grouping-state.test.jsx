import React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { PluginHost } from '@devexpress/dx-react-core';
import {
  groupByColumn,
  toggleExpandedGroups,
  draftGrouping,
  draftGroupingChange,
  cancelGroupingChange,
} from '@devexpress/dx-grid-core';
import { pluginDepsToComponents, getComputedState } from './test-utils';
import { GroupingState } from './grouping-state';

jest.mock('@devexpress/dx-grid-core', () => ({
  groupByColumn: jest.fn(),
  toggleExpandedGroups: jest.fn(),
  draftGrouping: jest.fn(),
  draftGroupingChange: jest.fn(),
  cancelGroupingChange: jest.fn(),
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
    groupByColumn.mockImplementation(() => {});
    draftGrouping.mockImplementation(() => 'draftGrouping');
    toggleExpandedGroups.mockImplementation(() => {});
    draftGroupingChange.mockImplementation(() => {});
    cancelGroupingChange.mockImplementation(() => {});
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('grouping', () => {
    it('should provide grouping defined in defaultGrouping property', () => {
      const defaultGrouping = [{ columnName: 'a' }];

      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <GroupingState
            defaultGrouping={defaultGrouping}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).getters.grouping)
        .toBe(defaultGrouping);
    });

    it('should provide grouping defined in grouping property', () => {
      const grouping = [{ columnName: 'a' }];

      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <GroupingState
            grouping={grouping}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).getters.grouping)
        .toBe(grouping);
    });

    it('should fire "onGroupingChange" callback and should change grouping in uncontrolled mode "groupByColumn"', () => {
      const defaultGrouping = [{ columnName: 'a' }];
      const newGrouping = [{ columnName: 'b' }];

      const groupingChange = jest.fn();
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <GroupingState
            defaultGrouping={defaultGrouping}
            onGroupingChange={groupingChange}
          />
        </PluginHost>
      ));

      const payload = {};
      groupByColumn.mockReturnValue({ grouping: newGrouping });
      getComputedState(tree).actions.groupByColumn(payload);

      expect(groupByColumn)
        .toBeCalledWith(expect.objectContaining({ grouping: defaultGrouping }), payload);

      expect(getComputedState(tree).getters.grouping)
        .toBe(newGrouping);

      expect(groupingChange)
        .toBeCalledWith(newGrouping);
    });

    it('should fire "onGroupingChange" callback and should not change grouping in controlled mode "groupByColumn"', () => {
      const grouping = [{ columnName: 'a' }];
      const newGrouping = [{ columnName: 'b' }];

      const groupingChange = jest.fn();
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <GroupingState
            grouping={grouping}
            onGroupingChange={groupingChange}
          />
        </PluginHost>
      ));

      const payload = {};
      groupByColumn.mockReturnValue({ grouping: newGrouping });
      getComputedState(tree).actions.groupByColumn(payload);

      expect(groupByColumn)
        .toBeCalledWith(expect.objectContaining({ grouping }), payload);

      expect(getComputedState(tree).getters.grouping)
        .toBe(grouping);

      expect(groupingChange)
        .toBeCalledWith(newGrouping);
    });
  });

  describe('expandedGroups', () => {
    it('should provide expandedGroups defined in defaultExpandedGroups property', () => {
      const defaultExpandedGroups = [1];

      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <GroupingState
            defaultExpandedGroups={defaultExpandedGroups}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).getters.expandedGroups)
        .toEqual(new Set(defaultExpandedGroups));
    });

    it('should provide expandedGroups defined in expandedGroups property', () => {
      const expandedGroups = [1];

      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <GroupingState
            expandedGroups={expandedGroups}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).getters.expandedGroups)
        .toEqual(new Set(expandedGroups));
    });

    it('should fire "onExpandedGroupsChange" and should change expandedGroups in uncontrolled mode "toggleExpandedGroups"', () => {
      const defaultExpandedGroups = [1];
      const newExpandedGroups = [2];

      const expandedGroupsChange = jest.fn();
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <GroupingState
            defaultExpandedGroups={defaultExpandedGroups}
            onExpandedGroupsChange={expandedGroupsChange}
          />
        </PluginHost>
      ));

      const payload = {};
      toggleExpandedGroups.mockReturnValue({ expandedGroups: newExpandedGroups });
      getComputedState(tree).actions.toggleGroupExpanded(payload);

      expect(toggleExpandedGroups)
        .toBeCalledWith(
          expect.objectContaining({ expandedGroups: defaultExpandedGroups }),
          payload,
        );

      expect(getComputedState(tree).getters.expandedGroups)
        .toEqual(new Set(newExpandedGroups));

      expect(expandedGroupsChange)
        .toBeCalledWith(newExpandedGroups);
    });

    it('should fire "onExpandedGroupsChange" and should change expandedGroups in uncontrolled mode on "groupByColumn" action', () => {
      const defaultExpandedGroups = [1];
      const newExpandedGroups = [2];

      const expandedGroupsChange = jest.fn();
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <GroupingState
            defaultExpandedGroups={defaultExpandedGroups}
            onExpandedGroupsChange={expandedGroupsChange}
          />
        </PluginHost>
      ));

      const payload = {};
      groupByColumn.mockReturnValue({ expandedGroups: newExpandedGroups });
      getComputedState(tree).actions.groupByColumn(payload);

      expect(groupByColumn)
        .toBeCalledWith(
          expect.objectContaining({ expandedGroups: defaultExpandedGroups }),
          payload,
        );

      expect(getComputedState(tree).getters.expandedGroups)
        .toEqual(new Set(newExpandedGroups));

      expect(expandedGroupsChange)
        .toBeCalledWith(newExpandedGroups);
    });

    it('should fire "onExpandedGroupsChange" and should not change expandedGroups in controlled mode "toggleExpandedGroups"', () => {
      const expandedGroups = [1];
      const newExpandedGroups = [2];

      const expandedGroupsChange = jest.fn();
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <GroupingState
            expandedGroups={expandedGroups}
            onExpandedGroupsChange={expandedGroupsChange}
          />
        </PluginHost>
      ));

      const payload = {};
      toggleExpandedGroups.mockReturnValue({ expandedGroups: newExpandedGroups });
      getComputedState(tree).actions.toggleGroupExpanded(payload);

      expect(toggleExpandedGroups)
        .toBeCalledWith(expect.objectContaining({ expandedGroups }), payload);

      expect(getComputedState(tree).getters.expandedGroups)
        .toEqual(new Set(expandedGroups));

      expect(expandedGroupsChange)
        .toBeCalledWith(newExpandedGroups);
    });

    it('should fire "onExpandedGroupsChange" and should not change expandedGroups in controlled mode on "groupByColumn" action', () => {
      const expandedGroups = [1];
      const newExpandedGroups = [2];

      const expandedGroupsChange = jest.fn();
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <GroupingState
            expandedGroups={expandedGroups}
            onExpandedGroupsChange={expandedGroupsChange}
          />
        </PluginHost>
      ));

      const payload = {};
      groupByColumn.mockReturnValue({ expandedGroups: newExpandedGroups });
      getComputedState(tree).actions.groupByColumn(payload);

      expect(groupByColumn)
        .toBeCalledWith(
          expect.objectContaining({ expandedGroups }),
          payload,
        );

      expect(getComputedState(tree).getters.expandedGroups)
        .toEqual(new Set(expandedGroups));

      expect(expandedGroupsChange)
        .toBeCalledWith(newExpandedGroups);
    });
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

      expect(draftGrouping)
        .toBeCalledWith(defaultGrouping, null);
      expect(getComputedState(tree).getters.draftGrouping)
        .toBe(draftGrouping());
    });

    it('should provide draftGrouping getter based on the result of draftGroupingChange action', () => {
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
      draftGroupingChange.mockImplementation(() => ({ groupingChange: 'change' }));
      getComputedState(tree).actions.draftGroupingChange(payload);

      expect(draftGroupingChange)
        .toBeCalledWith(expect.objectContaining({ groupingChange: null }), payload);

      expect(draftGrouping)
        .toBeCalledWith(defaultGrouping, draftGroupingChange().groupingChange);
    });

    it('should provide draftGrouping getter based on the result of cancelGroupingChange result', () => {
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
      cancelGroupingChange.mockImplementation(() => ({ groupingChange: 'change' }));
      getComputedState(tree).actions.cancelGroupingChange(payload);

      expect(cancelGroupingChange)
        .toBeCalledWith(expect.objectContaining({ groupingChange: null }), payload);

      expect(draftGrouping)
        .toBeCalledWith(defaultGrouping, cancelGroupingChange().groupingChange);
    });
  });

  describe('setColumnSorting action extending', () => {
    it('should modify setColumnSorting action payload when sorted column is grouped', () => {
      const deps = {
        getter: {
          sorting: [],
        },
        action: {
          setColumnSorting: jest.fn(),
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

      getComputedState(tree).actions.setColumnSorting({ columnName: 'a', direction: 'asc' });
      expect(deps.action.setColumnSorting.mock.calls[0][0])
        .toEqual({
          columnName: 'a',
          direction: 'asc',
          keepOther: true,
          sortIndex: 0,
        });
    });

    it('should modify setColumnSorting action payload when several grouped columns is sorted', () => {
      const deps = {
        getter: {
          sorting: [{ columnName: 'a', direction: 'asc' }, { columnName: 'b', direction: 'asc' }, { columnName: 'c', direction: 'asc' }],
        },
        action: {
          setColumnSorting: jest.fn(),
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

      getComputedState(tree).actions.setColumnSorting({ columnName: 'c' });
      expect(deps.action.setColumnSorting.mock.calls[0][0])
        .toEqual({
          columnName: 'c',
          keepOther: true,
          sortIndex: 2,
        });
    });

    it('should correctly set sortIndex for setColumnSorting action when some grouped columns is not sorted', () => {
      const deps = {
        getter: {
          sorting: [{ columnName: 'a', direction: 'asc' }, { columnName: 'c', direction: 'asc' }],
        },
        action: {
          setColumnSorting: jest.fn(),
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

      getComputedState(tree).actions.setColumnSorting({ columnName: 'c' });
      expect(deps.action.setColumnSorting.mock.calls[0][0])
        .toEqual({
          columnName: 'c',
          keepOther: true,
          sortIndex: 1,
        });
    });

    it('should modify setColumnSorting action payload when one grouped column is sorted', () => {
      const deps = {
        getter: {
          sorting: [],
        },
        action: {
          setColumnSorting: jest.fn(),
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

      getComputedState(tree).actions.setColumnSorting({ columnName: 'b' });
      expect(deps.action.setColumnSorting.mock.calls[0][0])
        .toEqual({
          columnName: 'b',
          keepOther: true,
          sortIndex: 0,
        });
    });

    it('should modify setColumnSorting action payload when sorted column is not grouped', () => {
      const deps = {
        getter: {
          sorting: [],
        },
        action: {
          setColumnSorting: jest.fn(),
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

      getComputedState(tree).actions.setColumnSorting({ columnName: 'c', direction: 'asc' });
      expect(deps.action.setColumnSorting.mock.calls[0][0])
        .toEqual({
          columnName: 'c',
          direction: 'asc',
          keepOther: ['a', 'b'],
        });
    });
  });

  describe('setColumnSorting action on groupByColumn action', () => {
    it('should fire setColumnSorting action when grouped by sorted column', () => {
      const deps = {
        getter: {
          sorting: [{ columnName: 'b', direction: 'asc' }, { columnName: 'a', direction: 'asc' }],
        },
        action: {
          setColumnSorting: jest.fn(),
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

      groupByColumn.mockReturnValue({ grouping: [{ columnName: 'a' }] });
      getComputedState(tree).actions.groupByColumn({ columnName: 'a' });
      expect(deps.action.setColumnSorting.mock.calls[0][0])
        .toEqual({
          columnName: 'a',
          direction: 'asc',
          keepOther: true,
          sortIndex: 0,
        });
    });

    it('should fire setColumnSorting action when ungrouped by sorted column', () => {
      const deps = {
        getter: {
          sorting: [{ columnName: 'a', direction: 'asc' }, { columnName: 'b', direction: 'asc' }],
        },
        action: {
          setColumnSorting: jest.fn(),
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

      groupByColumn.mockReturnValue({ grouping: [{ columnName: 'b' }] });
      getComputedState(tree).actions.groupByColumn({ columnName: 'a' });
      expect(deps.action.setColumnSorting.mock.calls[0][0])
        .toEqual({
          columnName: 'a',
          direction: 'asc',
          keepOther: true,
          sortIndex: 1,
        });
    });

    it('should correctly calculate sortIndex when some grouped columns is not sorted', () => {
      const deps = {
        getter: {
          sorting: [{ columnName: 'a', direction: 'asc' }, { columnName: 'c', direction: 'asc' }],
        },
        action: {
          setColumnSorting: jest.fn(),
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

      groupByColumn.mockReturnValue({ grouping: [{ columnName: 'a' }, { columnName: 'c' }, { columnName: 'b' }] });
      getComputedState(tree).actions.groupByColumn({ columnName: 'c', groupIndex: 1 });
      expect(deps.action.setColumnSorting)
        .not.toBeCalled();
    });

    it('should not fire setColumnSorting action when ungrouped last sorted column', () => {
      const deps = {
        getter: {
          sorting: [{ columnName: 'a', direction: 'asc' }],
        },
        action: {
          setColumnSorting: jest.fn(),
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

      groupByColumn.mockReturnValue({ grouping: [] });
      getComputedState(tree).actions.groupByColumn({ columnName: 'a' });
      expect(deps.action.setColumnSorting)
        .not.toBeCalled();
    });

    it('should not fire setColumnSorting action when grouped column sorting index is correct', () => {
      const deps = {
        getter: {
          sorting: [{ columnName: 'a', direction: 'asc' }, { columnName: 'b', direction: 'asc' }],
        },
        action: {
          setColumnSorting: jest.fn(),
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

      groupByColumn.mockReturnValue({ grouping: [{ columnName: 'a' }, { columnName: 'b' }] });
      getComputedState(tree).actions.groupByColumn({ columnName: 'b' });
      expect(deps.action.setColumnSorting)
        .not.toBeCalled();
    });
  });
});
