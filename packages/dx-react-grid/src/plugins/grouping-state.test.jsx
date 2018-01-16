import React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { PluginHost } from '@devexpress/dx-react-core';
import {
  changeColumnGrouping,
  toggleExpandedGroups,
  draftGrouping,
  draftGroupingChange,
  cancelGroupingChange,
} from '@devexpress/dx-grid-core';
import { pluginDepsToComponents, getComputedState, executeComputedAction } from './test-utils';
import { GroupingState } from './grouping-state';

jest.mock('@devexpress/dx-grid-core', () => ({
  changeColumnGrouping: jest.fn(),
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
    changeColumnGrouping.mockImplementation(() => {});
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

      expect(getComputedState(tree).grouping)
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

      expect(getComputedState(tree).grouping)
        .toBe(grouping);
    });

    it('should fire "onGroupingChange" callback and should change grouping in uncontrolled mode "changeColumnGrouping"', () => {
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
      changeColumnGrouping.mockReturnValue({ grouping: newGrouping });
      executeComputedAction(tree, actions => actions.changeColumnGrouping(payload));

      expect(changeColumnGrouping)
        .toBeCalledWith(expect.objectContaining({ grouping: defaultGrouping }), payload);

      expect(getComputedState(tree).grouping)
        .toBe(newGrouping);

      expect(groupingChange)
        .toBeCalledWith(newGrouping);
    });

    it('should fire "onGroupingChange" callback and should not change grouping in controlled mode "changeColumnGrouping"', () => {
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
      changeColumnGrouping.mockReturnValue({ grouping: newGrouping });
      executeComputedAction(tree, actions => actions.changeColumnGrouping(payload));

      expect(changeColumnGrouping)
        .toBeCalledWith(expect.objectContaining({ grouping }), payload);

      expect(getComputedState(tree).grouping)
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

      expect(getComputedState(tree).expandedGroups)
        .toEqual(defaultExpandedGroups);
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

      expect(getComputedState(tree).expandedGroups)
        .toEqual(expandedGroups);
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
      executeComputedAction(tree, actions => actions.toggleGroupExpanded(payload));

      expect(toggleExpandedGroups)
        .toBeCalledWith(
          expect.objectContaining({ expandedGroups: defaultExpandedGroups }),
          payload,
        );

      expect(getComputedState(tree).expandedGroups)
        .toEqual(newExpandedGroups);

      expect(expandedGroupsChange)
        .toBeCalledWith(newExpandedGroups);
    });

    it('should fire "onExpandedGroupsChange" and should change expandedGroups in uncontrolled mode on "changeColumnGrouping" action', () => {
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
      changeColumnGrouping.mockReturnValue({ expandedGroups: newExpandedGroups });
      executeComputedAction(tree, actions => actions.changeColumnGrouping(payload));

      expect(changeColumnGrouping)
        .toBeCalledWith(
          expect.objectContaining({ expandedGroups: defaultExpandedGroups }),
          payload,
        );

      expect(getComputedState(tree).expandedGroups)
        .toEqual(newExpandedGroups);

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
      executeComputedAction(tree, actions => actions.toggleGroupExpanded(payload));

      expect(toggleExpandedGroups)
        .toBeCalledWith(expect.objectContaining({ expandedGroups }), payload);

      expect(getComputedState(tree).expandedGroups)
        .toEqual(expandedGroups);

      expect(expandedGroupsChange)
        .toBeCalledWith(newExpandedGroups);
    });

    it('should fire "onExpandedGroupsChange" and should not change expandedGroups in controlled mode on "changeColumnGrouping" action', () => {
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
      changeColumnGrouping.mockReturnValue({ expandedGroups: newExpandedGroups });
      executeComputedAction(tree, actions => actions.changeColumnGrouping(payload));

      expect(changeColumnGrouping)
        .toBeCalledWith(
          expect.objectContaining({ expandedGroups }),
          payload,
        );

      expect(getComputedState(tree).expandedGroups)
        .toEqual(expandedGroups);

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
      expect(getComputedState(tree).draftGrouping)
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
      executeComputedAction(tree, actions => actions.draftGroupingChange(payload));

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
      executeComputedAction(tree, actions => actions.cancelGroupingChange(payload));

      expect(cancelGroupingChange)
        .toBeCalledWith(expect.objectContaining({ groupingChange: null }), payload);

      expect(draftGrouping)
        .toBeCalledWith(defaultGrouping, cancelGroupingChange().groupingChange);
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

      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps, deps)}
          <GroupingState
            defaultGrouping={[{ columnName: 'a' }]}
          />
        </PluginHost>
      ));

      executeComputedAction(tree, actions => actions.changeColumnSorting({ columnName: 'a', direction: 'asc' }));
      expect(deps.action.changeColumnSorting.mock.calls[0][0])
        .toEqual({
          columnName: 'a',
          direction: 'asc',
          keepOther: true,
          sortIndex: 0,
        });
    });

    it('should modify changeColumnSorting action payload when several grouped columns is sorted', () => {
      const deps = {
        getter: {
          sorting: [{ columnName: 'a', direction: 'asc' }, { columnName: 'b', direction: 'asc' }, { columnName: 'c', direction: 'asc' }],
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

      executeComputedAction(tree, actions => actions.changeColumnSorting({ columnName: 'c' }));
      expect(deps.action.changeColumnSorting.mock.calls[0][0])
        .toEqual({
          columnName: 'c',
          keepOther: true,
          sortIndex: 2,
        });
    });

    it('should correctly set sortIndex for changeColumnSorting action when some grouped columns is not sorted', () => {
      const deps = {
        getter: {
          sorting: [{ columnName: 'a', direction: 'asc' }, { columnName: 'c', direction: 'asc' }],
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

      executeComputedAction(tree, actions => actions.changeColumnSorting({ columnName: 'c' }));
      expect(deps.action.changeColumnSorting.mock.calls[0][0])
        .toEqual({
          columnName: 'c',
          keepOther: true,
          sortIndex: 1,
        });
    });

    it('should modify changeColumnSorting action payload when one grouped column is sorted', () => {
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

      executeComputedAction(tree, actions => actions.changeColumnSorting({ columnName: 'b' }));
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

      executeComputedAction(tree, actions => actions.changeColumnSorting({ columnName: 'c', direction: 'asc' }));
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
      const deps = {
        getter: {
          sorting: [{ columnName: 'b', direction: 'asc' }, { columnName: 'a', direction: 'asc' }],
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

      changeColumnGrouping.mockReturnValue({ grouping: [{ columnName: 'a' }] });
      executeComputedAction(tree, actions => actions.changeColumnGrouping({ columnName: 'a' }));
      expect(deps.action.changeColumnSorting.mock.calls[0][0])
        .toEqual({
          columnName: 'a',
          direction: 'asc',
          keepOther: true,
          sortIndex: 0,
        });
    });

    it('should fire changeColumnSorting action when ungrouped by sorted column', () => {
      const deps = {
        getter: {
          sorting: [{ columnName: 'a', direction: 'asc' }, { columnName: 'b', direction: 'asc' }],
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

      changeColumnGrouping.mockReturnValue({ grouping: [{ columnName: 'b' }] });
      executeComputedAction(tree, actions => actions.changeColumnGrouping({ columnName: 'a' }));
      expect(deps.action.changeColumnSorting.mock.calls[0][0])
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

      changeColumnGrouping.mockReturnValue({ grouping: [{ columnName: 'a' }, { columnName: 'c' }, { columnName: 'b' }] });
      executeComputedAction(tree, actions => actions.changeColumnGrouping({ columnName: 'a', groupIndex: 1 }));
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

    it('should not fire changeColumnSorting action when grouped column sorting index is correct', () => {
      const deps = {
        getter: {
          sorting: [{ columnName: 'a', direction: 'asc' }, { columnName: 'b', direction: 'asc' }],
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

      changeColumnGrouping.mockReturnValue({ grouping: [{ columnName: 'a' }, { columnName: 'b' }] });
      executeComputedAction(tree, actions => actions.changeColumnGrouping({ columnName: 'a' }));
      expect(deps.action.changeColumnSorting)
        .not.toBeCalled();
    });
  });

  describe('action sequence in batch', () => {
    it('should correctly work with the several action calls in the uncontrolled mode', () => {
      const defaultGrouping = [1];
      const transitionalGrouping = [2];
      const newGrouping = [3];
      const payload = {};

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

      changeColumnGrouping.mockReturnValueOnce({ grouping: transitionalGrouping });
      changeColumnGrouping.mockReturnValueOnce({ grouping: newGrouping });
      executeComputedAction(tree, (actions) => {
        actions.changeColumnGrouping(payload);
        actions.changeColumnGrouping(payload);
      });

      expect(changeColumnGrouping)
        .lastCalledWith(
          expect.objectContaining({ grouping: transitionalGrouping }),
          payload,
        );

      expect(groupingChange)
        .toHaveBeenCalledTimes(1);
    });

    it('should correctly work with the several action calls in the controlled mode', () => {
      const grouping = [1];
      const transitionalGrouping = [2];
      const newGrouping = [3];
      const payload = {};

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

      changeColumnGrouping.mockReturnValueOnce({ grouping: transitionalGrouping });
      changeColumnGrouping.mockReturnValueOnce({ grouping: newGrouping });
      executeComputedAction(tree, (actions) => {
        actions.changeColumnGrouping(payload);
        actions.changeColumnGrouping(payload);
      });

      expect(changeColumnGrouping)
        .lastCalledWith(
          expect.objectContaining({ grouping: transitionalGrouping }),
          payload,
        );

      expect(groupingChange)
        .toHaveBeenCalledTimes(1);
    });
  });
});
