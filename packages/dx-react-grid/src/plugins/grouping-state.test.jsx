import React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { PluginHost } from '@devexpress/dx-react-core';
import { pluginDepsToComponents, getComputedState } from './test-utils';

import { GroupingState } from './grouping-state';

const defaultDeps = {};

describe('GroupingState', () => {
  let resetConsole;

  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
  });

  describe('grouping', () => {
    it('should group by column', () => {
      const onGroupingChangeMock = jest.fn();

      const tree = mount(
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <GroupingState
            defaultGrouping={[{ columnName: 'b' }]}
            onGroupingChange={onGroupingChangeMock}
          />
        </PluginHost>,
      );

      getComputedState(tree).actions.groupByColumn({ columnName: 'a', groupIndex: 0 });

      expect(getComputedState(tree).getters.grouping)
        .toEqual([{ columnName: 'a' }, { columnName: 'b' }]);
      expect(onGroupingChangeMock)
        .toHaveBeenCalledWith([{ columnName: 'a' }, { columnName: 'b' }]);
    });

    it('should group by column in controlled mode', () => {
      const onGroupingChangeMock = jest.fn();

      const tree = mount(
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <GroupingState
            grouping={[{ columnName: 'b' }]}
            onGroupingChange={onGroupingChangeMock}
          />
        </PluginHost>,
      );

      getComputedState(tree).actions.groupByColumn({ columnName: 'a', groupIndex: 0 });

      expect(getComputedState(tree).getters.grouping)
        .toEqual([{ columnName: 'b' }]);
      expect(onGroupingChangeMock)
        .toHaveBeenCalledWith([{ columnName: 'a' }, { columnName: 'b' }]);
    });

    it('should ungroup by column', () => {
      const onGroupingChangeMock = jest.fn();

      const tree = mount(
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <GroupingState
            defaultGrouping={[{ columnName: 'a' }]}
            onGroupingChange={onGroupingChangeMock}
          />
        </PluginHost>,
      );

      getComputedState(tree).actions.groupByColumn({ columnName: 'a' });

      expect(getComputedState(tree).getters.grouping)
        .toHaveLength(0);
      expect(onGroupingChangeMock)
        .toHaveBeenCalledWith([]);
    });
  });

  describe('expanded groups', () => {
    it('should expand group row', () => {
      const expandedGroupsChangeMock = jest.fn();

      const tree = mount(
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <GroupingState
            defaultExpandedGroups={[]}
            onExpandedGroupsChange={expandedGroupsChangeMock}
          />
        </PluginHost>,
      );

      getComputedState(tree).actions.toggleGroupExpanded({ groupKey: 'a' });

      expect(getComputedState(tree).getters.expandedGroups)
        .toEqual(new Set(['a']));
      expect(expandedGroupsChangeMock)
        .toHaveBeenCalledWith(['a']);
    });

    it('should expand group row in controlled mode', () => {
      const expandedGroupsChangeMock = jest.fn();

      const tree = mount(
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <GroupingState
            expandedGroups={[]}
            onExpandedGroupsChange={expandedGroupsChangeMock}
          />
        </PluginHost>,
      );

      getComputedState(tree).actions.toggleGroupExpanded({ groupKey: 'a' });

      expect(getComputedState(tree).getters.expandedGroups)
        .toEqual(new Set([]));
      expect(expandedGroupsChangeMock)
        .toHaveBeenCalledWith(['a']);
    });

    it('should collapse group row', () => {
      const expandedGroupsChangeMock = jest.fn();

      const tree = mount(
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <GroupingState
            defaultExpandedGroups={['a']}
            onExpandedGroupsChange={expandedGroupsChangeMock}
          />
        </PluginHost>,
      );

      getComputedState(tree).actions.toggleGroupExpanded({ groupKey: 'a' });

      expect(getComputedState(tree).getters.expandedGroups)
        .toEqual(new Set([]));
      expect(expandedGroupsChangeMock)
        .toHaveBeenCalledWith([]);
    });
  });

  describe('expanded groups on grouping change', () => {
    it('should clear expanded rows after ungrouping', () => {
      const expandedGroupsChangeMock = jest.fn();

      const tree = mount(
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <GroupingState
            defaultGrouping={[{ columnName: 'a' }]}
            defaultExpandedGroups={['John']}
            onExpandedGroupsChange={expandedGroupsChangeMock}
          />
        </PluginHost>,
      );

      getComputedState(tree).actions.groupByColumn({ columnName: 'a' });

      expect(getComputedState(tree).getters.expandedGroups)
        .toEqual(new Set([]));
      expect(expandedGroupsChangeMock)
        .toHaveBeenCalledWith([]);
    });

    it('should clear expanded rows after ungrouping nested rows', () => {
      const expandedGroupsChangeMock = jest.fn();

      const tree = mount(
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <GroupingState
            defaultGrouping={[{ columnName: 'name' }, { columnName: 'age' }]}
            defaultExpandedGroups={['John', 'John|30', 'Mike']}
            onExpandedGroupsChange={expandedGroupsChangeMock}
          />
        </PluginHost>,
      );

      getComputedState(tree).actions.groupByColumn({ columnName: 'age' });

      expect(getComputedState(tree).getters.expandedGroups)
        .toEqual(new Set(['John', 'Mike']));
      expect(expandedGroupsChangeMock)
        .toHaveBeenCalledWith(['John', 'Mike']);
    });

    it('should not clear expanded rows after grouping', () => {
      const expandedGroupsChangeMock = jest.fn();

      const tree = mount(
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <GroupingState
            defaultGrouping={[{ columnName: 'name' }]}
            defaultExpandedGroups={['John', 'Mike']}
            onExpandedGroupsChange={expandedGroupsChangeMock}
          />
        </PluginHost>,
      );

      getComputedState(tree).actions.groupByColumn({ columnName: 'age' });

      expect(getComputedState(tree).getters.expandedGroups)
        .toEqual(new Set(['John', 'Mike']));
      expect(expandedGroupsChangeMock.mock.calls)
        .toHaveLength(0);
    });

    it('should not change expanded groups if they are controlled by the user', () => {
      const expandedGroupsChangeMock = jest.fn();

      // eslint-disable-next-line react/prop-types
      const TestCase = ({ expandedGroups, onGroupingChange }) => (
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <GroupingState
            defaultGrouping={[{ columnName: 'name' }, { columnName: 'age' }]}
            onGroupingChange={onGroupingChange}
            expandedGroups={expandedGroups}
            onExpandedGroupsChange={expandedGroupsChangeMock}
          />
        </PluginHost>
      );

      const tree = mount(
        <TestCase
          expandedGroups={['John', 'Mike', 'John|75', 'Mike|30']}
          onGroupingChange={() => tree.setProps({ expandedGroups: ['John'] })}
        />,
      );

      getComputedState(tree).actions.groupByColumn({ columnName: 'age' });

      expect(expandedGroupsChangeMock)
        .not.toHaveBeenCalled();
    });
  });

  describe('draftGroupingChange', () => {
    it('should add the column passed to draftGrouping', () => {
      const tree = mount(
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <GroupingState
            defaultGrouping={[]}
          />
        </PluginHost>,
      );

      getComputedState(tree).actions.draftGroupingChange({ columnName: 'a', groupIndex: 0 });

      expect(getComputedState(tree).getters.draftGrouping)
        .toEqual([{ columnName: 'a', draft: true, mode: 'add' }]);
    });
  });

  describe('cancelGroupingChange', () => {
    it('should reset draftGrouping', () => {
      const tree = mount(
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <GroupingState
            defaultGrouping={[{ columnName: 'a' }]}
          />
        </PluginHost>,
      );

      getComputedState(tree).actions.draftGroupingChange({ columnName: 'a', groupIndex: 0 });
      getComputedState(tree).actions.cancelGroupingChange();

      expect(getComputedState(tree).getters.draftGrouping)
        .toEqual([{ columnName: 'a' }]);
    });
  });
});
