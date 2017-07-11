import React from 'react';
import { mount } from 'enzyme';

import { setupConsole } from '@devexpress/dx-testing';

import { Template, Getter, PluginHost } from '@devexpress/dx-react-core';

import { GroupingState } from './grouping-state';

describe('GroupingState', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
  });

  describe('grouping', () => {
    it('should be initially exposed depending on the "defaultGrouping" property in the uncontrolled mode', () => {
      let groupingGetter;
      mount(
        <PluginHost>
          <Getter
            name="columns"
            value={[{ name: 'a' }, { name: 'b' }]}
          />
          <GroupingState
            defaultGrouping={[{ columnName: 'a' }]}
          />
          <Template
            name="root"
            connectGetters={getter => (groupingGetter = getter('grouping'))}
          >
            {() => <div />}
          </Template>
        </PluginHost>,
      );

      expect(groupingGetter)
        .toEqual([{ columnName: 'a' }]);
    });

    it('should be applied depending on the "grouping" property in the controlled mode', () => {
      let groupingGetter;
      mount(
        <PluginHost>
          <Getter
            name="columns"
            value={[{ name: 'a' }, { name: 'b' }]}
          />
          <GroupingState
            grouping={[{ columnName: 'a' }]}
          />
          <Template
            name="root"
            connectGetters={getter => (groupingGetter = getter('grouping'))}
          >
            {() => <div />}
          </Template>
        </PluginHost>,
      );

      expect(groupingGetter)
        .toEqual([{ columnName: 'a' }]);
    });
  });

  describe('expandedGroups', () => {
    it('should be initially set depending on the "defaultExpandedGroups" property in the uncontrolled mode', () => {
      let expandedGroups;
      mount(
        <PluginHost>
          <GroupingState
            defaultExpandedGroups={['a']}
          />
          <Template
            name="root"
            connectGetters={getter => (expandedGroups = getter('expandedGroups'))}
          >
            {() => <div />}
          </Template>
        </PluginHost>,
      );

      expect(expandedGroups)
        .toEqual(new Set('a'));
    });

    it('should be applied depending on the "expandedGroups" property in the controlled mode', () => {
      let expandedGroups;
      mount(
        <PluginHost>
          <GroupingState
            expandedGroups={['a']}
          />
          <Template
            name="root"
            connectGetters={getter => (expandedGroups = getter('expandedGroups'))}
          >
            {() => <div />}
          </Template>
        </PluginHost>,
      );

      expect(expandedGroups)
        .toEqual(new Set('a'));
    });
  });

  describe('groupedColumns', () => {
    it('should be initially set depending on the "defaultGrouping" property in the uncontrolled mode', () => {
      let groupedColumns;
      mount(
        <PluginHost>
          <Getter
            name="columns"
            value={[{ name: 'a' }, { name: 'b' }]}
          />
          <GroupingState
            defaultGrouping={[{ columnName: 'a' }]}
          />
          <Template
            name="root"
            connectGetters={getter => (groupedColumns = getter('groupedColumns'))}
          >
            {() => <div />}
          </Template>
        </PluginHost>,
      );

      expect(groupedColumns)
        .toEqual([{ name: 'a' }]);
    });

    it('should be applied depending on the "grouping" property in the controlled mode', () => {
      let groupedColumns;
      mount(
        <PluginHost>
          <Getter
            name="columns"
            value={[{ name: 'a' }, { name: 'b' }]}
          />
          <GroupingState
            grouping={[{ columnName: 'a' }]}
          />
          <Template
            name="root"
            connectGetters={getter => (groupedColumns = getter('groupedColumns'))}
          >
            {() => <div />}
          </Template>
        </PluginHost>,
      );

      expect(groupedColumns)
        .toEqual([{ name: 'a' }]);
    });
  });

  describe('visualGrouping', () => {
    it('should be initially set depending on the "defaultGroupingChange" property in the uncontrolled mode', () => {
      let visualGrouping;
      mount(
        <PluginHost>
          <Getter
            name="columns"
            value={[{ name: 'a' }, { name: 'b' }, { name: 'c' }]}
          />
          <GroupingState
            defaultGrouping={[{ columnName: 'a' }, { columnName: 'c' }]}
            defaultGroupingChange={{ columnName: 'b', groupIndex: 1 }}
          />
          <Template
            name="root"
            connectGetters={getter => (visualGrouping = getter('visualGrouping'))}
          >
            {() => <div />}
          </Template>
        </PluginHost>,
      );

      expect(visualGrouping)
        .toEqual([{ columnName: 'a' }, { columnName: 'b', isDraft: true }, { columnName: 'c' }]);
    });

    it('should be applied depending on the "groupingChange" property in the controlled mode', () => {
      let visualGrouping;
      mount(
        <PluginHost>
          <Getter
            name="columns"
            value={[{ name: 'a' }, { name: 'b' }, { name: 'c' }]}
          />
          <GroupingState
            grouping={[{ columnName: 'a' }, { columnName: 'c' }]}
            groupingChange={{ columnName: 'b', groupIndex: 1 }}
          />
          <Template
            name="root"
            connectGetters={getter => (visualGrouping = getter('visualGrouping'))}
          >
            {() => <div />}
          </Template>
        </PluginHost>,
      );

      expect(visualGrouping)
        .toEqual([{ columnName: 'a' }, { columnName: 'b', isDraft: true }, { columnName: 'c' }]);
    });
  });

  describe('visuallyGroupedColumns', () => {
    it('should expose correct value', () => {
      let visuallyGroupedColumns;
      const columns = [{ name: 'a' }, { name: 'b' }];
      mount(
        <PluginHost>
          <Getter
            name="columns"
            value={columns}
          />
          <GroupingState
            grouping={[]}
            groupingChange={{ columnName: 'b', groupIndex: 0 }}
          />
          <Template
            name="root"
            connectGetters={getter => (visuallyGroupedColumns = getter('visuallyGroupedColumns'))}
          >
            {() => <div />}
          </Template>
        </PluginHost>,
      );

      expect(visuallyGroupedColumns)
        .toEqual([
          { column: columns[1], isDraft: true },
        ]);
    });
  });

  describe('startGroupingChange', () => {
    it('should add the column passed to visualGrouping', () => {
      let visualGrouping;
      let startGroupingChange;
      mount(
        <PluginHost>
          <GroupingState
            grouping={[]}
          />
          <Template
            name="root"
            connectGetters={getter => (visualGrouping = getter('visualGrouping'))}
            connectActions={action => (startGroupingChange = action('startGroupingChange'))}
          >
            {() => <div />}
          </Template>
        </PluginHost>,
      );

      startGroupingChange({ columnName: 'a', groupIndex: 0 });

      expect(visualGrouping)
        .toEqual([{ columnName: 'a', isDraft: true }]);
    });
  });

  describe('cancelGroupingChange', () => {
    it('should reset visualGrouping', () => {
      let visualGrouping;
      let cancelGroupingChange;
      mount(
        <PluginHost>
          <GroupingState
            grouping={[{ columnName: 'a' }]}
            visualGrouping={[{ columnName: 'b', isDraft: true }]}
          />
          <Template
            name="root"
            connectGetters={getter => (visualGrouping = getter('visualGrouping'))}
            connectActions={action => (cancelGroupingChange = action('cancelGroupingChange'))}
          >
            {() => <div />}
          </Template>
        </PluginHost>,
      );

      cancelGroupingChange();

      expect(visualGrouping)
        .toEqual([{ columnName: 'a' }]);
    });
  });

  describe('toggleGroupExpanded', () => {
    it('should update expanded groups', () => {
      let expandedGroups;
      let toggleGroupExpanded;
      mount(
        <PluginHost>
          <GroupingState
            defaultExpandedGroups={['b']}
          />
          <Template
            name="root"
            connectGetters={getter => (expandedGroups = getter('expandedGroups'))}
            connectActions={action => (toggleGroupExpanded = action('toggleGroupExpanded'))}
          >
            {() => <div />}
          </Template>
        </PluginHost>,
      );

      toggleGroupExpanded({ groupKey: 'a' });

      expect(expandedGroups)
        .toEqual(new Set(['b', 'a']));
    });

    it('should fire the "onExpandedGroupsChange" event with correct arguments', () => {
      const onExpandedGroupsChange = jest.fn();
      let toggleGroupExpanded;
      mount(
        <PluginHost>
          <GroupingState
            onExpandedGroupsChange={onExpandedGroupsChange}
          />
          <Template
            name="root"
            connectActions={action => (toggleGroupExpanded = action('toggleGroupExpanded'))}
          >
            {() => <div />}
          </Template>
        </PluginHost>,
      );

      toggleGroupExpanded({ groupKey: 'a' });

      expect(onExpandedGroupsChange)
        .toHaveBeenCalledTimes(1);
      expect(onExpandedGroupsChange)
        .toHaveBeenCalledWith(['a']);
    });
  });

  describe('groupByColumn', () => {
    it('should update grouping', () => {
      let grouping;
      let groupByColumn;
      mount(
        <PluginHost>
          <GroupingState
            defaultGrouping={[]}
          />
          <Template
            name="root"
            connectGetters={getter => (grouping = getter('grouping'))}
            connectActions={action => (groupByColumn = action('groupByColumn'))}
          >
            {() => <div />}
          </Template>
        </PluginHost>,
      );

      groupByColumn({ columnName: 'a' });

      expect(grouping)
        .toEqual([{ columnName: 'a' }]);
    });

    it('should fire the "onGroupingChange" event with correct arguments', () => {
      const onGroupingChange = jest.fn();
      let groupByColumn;
      mount(
        <PluginHost>
          <GroupingState
            defaultGrouping={[{ columnName: 'b' }]}
            onGroupingChange={onGroupingChange}
          />
          <Template
            name="root"
            connectActions={action => (groupByColumn = action('groupByColumn'))}
          >
            {() => <div />}
          </Template>
        </PluginHost>,
      );

      groupByColumn({ columnName: 'a', groupIndex: 1 });

      expect(onGroupingChange)
        .toHaveBeenCalledTimes(1);
      expect(onGroupingChange)
        .toHaveBeenCalledWith([
          { columnName: 'b' },
          { columnName: 'a' },
        ]);
    });
  });
});
