import React from 'react';
import { mount } from 'enzyme';

import { setupConsole } from '@devexpress/dx-testing';
import { Template, PluginHost } from '@devexpress/dx-react-core';

import { GroupingState } from './grouping-state';

describe('GroupingState', () => {
  const mountPlugin = (pluginProps, templateProps) => {
    mount(
      <PluginHost>
        <GroupingState
          {...pluginProps}
        />
        <Template
          name="root"
          {...templateProps}
        >
          {() => <div />}
        </Template>
      </PluginHost>,
    );
  };
  let resetConsole;

  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
  });

  describe('grouping', () => {
    it('should group by column', () => {
      let grouping = [{ columnName: 'b' }];
      let groupByColumn;
      const onGroupingChange = jest.fn();

      mountPlugin({
        defaultGrouping: grouping,
        onGroupingChange,
      }, {
        connectGetters: (getter) => { grouping = Array.from(getter('grouping')); },
        connectActions: (action) => { groupByColumn = action('groupByColumn'); },
      });

      groupByColumn({ columnName: 'a', groupIndex: 0 });

      expect(grouping)
        .toEqual([{ columnName: 'a' }, { columnName: 'b' }]);
      expect(onGroupingChange)
        .toHaveBeenCalledWith([{ columnName: 'a' }, { columnName: 'b' }]);
    });

    it('should group by column in controlled mode', () => {
      let grouping;
      let groupByColumn;
      const onGroupingChange = jest.fn();

      mountPlugin({
        grouping: [{ columnName: 'b' }],
        onGroupingChange,
      }, {
        connectGetters: (getter) => { grouping = Array.from(getter('grouping')); },
        connectActions: (action) => { groupByColumn = action('groupByColumn'); },
      });

      groupByColumn({ columnName: 'a', groupIndex: 0 });

      expect(grouping)
        .toEqual([{ columnName: 'b' }]);
      expect(onGroupingChange)
        .toHaveBeenCalledWith([{ columnName: 'a' }, { columnName: 'b' }]);
    });

    it('should ungroup by column', () => {
      let grouping = [{ columnName: 'a' }];
      let groupByColumn;
      const groupingChange = jest.fn();

      mountPlugin({
        defaultGrouping: grouping,
        onGroupingChange: groupingChange,
      }, {
        connectGetters: (getter) => { grouping = Array.from(getter('grouping')); },
        connectActions: (action) => { groupByColumn = action('groupByColumn'); },
      });

      groupByColumn({ columnName: 'a' });

      expect(grouping)
        .toHaveLength(0);
      expect(groupingChange.mock.calls[0][0])
        .toHaveLength(0);
    });
  });

  describe('expanded groups', () => {
    it('should expand group row', () => {
      let expandedGroups;
      let toggleGroupExpanded;
      const expandedGroupsChangeMock = jest.fn();

      mountPlugin({
        onExpandedGroupsChange: expandedGroupsChangeMock,
      }, {
        connectGetters: (getter) => { expandedGroups = Array.from(getter('expandedGroups')); },
        connectActions: (action) => { toggleGroupExpanded = action('toggleGroupExpanded'); },
      });

      toggleGroupExpanded({ groupKey: 'a' });

      expect(expandedGroups)
        .toEqual(['a']);
      expect(expandedGroupsChangeMock)
        .toHaveBeenCalledWith(['a']);
    });

    it('should expand group row in controlled mode', () => {
      let expandedGroups;
      let toggleGroupExpanded;
      const expandedGroupsChangeMock = jest.fn();

      mountPlugin({
        expandedGroups: [],
        onExpandedGroupsChange: expandedGroupsChangeMock,
      }, {
        connectGetters: (getter) => { expandedGroups = Array.from(getter('expandedGroups')); },
        connectActions: (action) => { toggleGroupExpanded = action('toggleGroupExpanded'); },
      });

      toggleGroupExpanded({ groupKey: 'a' });

      expect(expandedGroups)
        .toHaveLength(0);
      expect(expandedGroupsChangeMock)
        .toHaveBeenCalledWith(['a']);
    });

    it('should collapse group row', () => {
      let expandedGroups;
      let toggleGroupExpanded;
      const expandedGroupsChangeMock = jest.fn();

      mountPlugin({
        defaultExpandedGroups: ['a'],
        onExpandedGroupsChange: expandedGroupsChangeMock,
      }, {
        connectGetters: (getter) => { expandedGroups = Array.from(getter('expandedGroups')); },
        connectActions: (action) => { toggleGroupExpanded = action('toggleGroupExpanded'); },
      });

      toggleGroupExpanded({ groupKey: 'a' });

      expect(expandedGroups)
        .toHaveLength(0);
      expect(expandedGroupsChangeMock.mock.calls[0][0])
        .toHaveLength(0);
    });
  });

  describe('expanded groups on grouping change', () => {
    it('should clear expanded rows after ungrouping', () => {
      let expandedGroups;
      let groupByColumn;
      const expandedGroupsChangeMock = jest.fn();

      mountPlugin({
        defaultGrouping: [{ columnName: 'name' }],
        defaultExpandedGroups: ['John'],
        onExpandedGroupsChange: expandedGroupsChangeMock,
      }, {
        connectGetters: (getter) => { expandedGroups = Array.from(getter('expandedGroups')); },
        connectActions: (action) => { groupByColumn = action('groupByColumn'); },
      });

      groupByColumn({ columnName: 'name' });

      expect(expandedGroups)
        .toHaveLength(0);
      expect(expandedGroupsChangeMock.mock.calls[0][0])
        .toHaveLength(0);
    });

    it('should clear expanded rows after ungrouping nested rows', () => {
      let expandedGroups;
      let groupByColumn;
      const expandedGroupsChangeMock = jest.fn();

      mountPlugin({
        defaultGrouping: [{ columnName: 'name' }, { columnName: 'age' }],
        defaultExpandedGroups: ['John', 'John|30', 'Mike'],
        onExpandedGroupsChange: expandedGroupsChangeMock,
      }, {
        connectGetters: (getter) => { expandedGroups = Array.from(getter('expandedGroups')); },
        connectActions: (action) => { groupByColumn = action('groupByColumn'); },
      });

      groupByColumn({ columnName: 'age' });

      expect(expandedGroups)
        .toEqual(['John', 'Mike']);
      expect(expandedGroupsChangeMock)
        .toHaveBeenCalledWith(['John', 'Mike']);
    });

    it('should not clear expanded rows after grouping', () => {
      let expandedGroups;
      let groupByColumn;
      const expandedGroupsChangeMock = jest.fn();

      mountPlugin({
        defaultGrouping: [{ columnName: 'name' }],
        defaultExpandedGroups: ['John', 'Mike'],
        onExpandedGroupsChange: expandedGroupsChangeMock,
      }, {
        connectGetters: (getter) => { expandedGroups = Array.from(getter('expandedGroups')); },
        connectActions: (action) => { groupByColumn = action('groupByColumn'); },
      });

      groupByColumn({ columnName: 'age' });

      expect(expandedGroups)
        .toEqual(['John', 'Mike']);
      expect(expandedGroupsChangeMock.mock.calls)
        .toHaveLength(0);
    });

    it('should not change expanded groups if they are controlled by the user', () => {
      let groupByColumn;
      const expandedGroupsChangeMock = jest.fn();

      // eslint-disable-next-line react/prop-types
      const TestCase = ({ expandedGroups, onGroupingChange }) => (
        <PluginHost>
          <GroupingState
            defaultGrouping={[{ columnName: 'name' }, { columnName: 'age' }]}
            onGroupingChange={onGroupingChange}
            expandedGroups={expandedGroups}
            onExpandedGroupsChange={expandedGroupsChangeMock}
          />
          <Template
            name="root"
            connectActions={(action) => { groupByColumn = action('groupByColumn'); }}
          >
            {() => <div />}
          </Template>
        </PluginHost>
      );

      const tree = mount(
        <TestCase
          expandedGroups={['John', 'Mike', 'John|75', 'Mike|30']}
          onGroupingChange={() => tree.setProps({ expandedGroups: ['John'] })}
        />,
      );

      groupByColumn({ columnName: 'age' });

      expect(expandedGroupsChangeMock)
        .not.toHaveBeenCalled();
    });
  });

  describe('draftGroupingChange', () => {
    it('should add the column passed to draftGrouping', () => {
      let draftGrouping;
      let draftGroupingChange;
      mountPlugin(
        { grouping: [] },
        {
          connectGetters: (getter) => { draftGrouping = getter('draftGrouping'); },
          connectActions: (action) => { draftGroupingChange = action('draftGroupingChange'); },
        },
      );

      draftGroupingChange({ columnName: 'a', groupIndex: 0 });

      expect(draftGrouping)
        .toEqual([{ columnName: 'a', draft: true, mode: 'add' }]);
    });
  });

  describe('cancelGroupingChange', () => {
    it('should reset draftGrouping', () => {
      let draftGrouping;
      let draftGroupingChange;
      let cancelGroupingChange;
      mountPlugin(
        { grouping: [{ columnName: 'a' }] },
        {
          connectGetters: (getter) => { draftGrouping = getter('draftGrouping'); },
          connectActions: (action) => {
            draftGroupingChange = action('draftGroupingChange');
            cancelGroupingChange = action('cancelGroupingChange');
          },
        },
      );

      draftGroupingChange({ columnName: 'v', groupIndex: 1 });
      cancelGroupingChange();

      expect(draftGrouping)
        .toEqual([{ columnName: 'a' }]);
    });
  });
});
