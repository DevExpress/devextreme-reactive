import React from 'react';
import { mount } from 'enzyme';

import { setupConsole } from '@devexpress/dx-testing';
import { Template, PluginHost } from '@devexpress/dx-react-core';

import { GroupingState } from './grouping-state';

describe('GroupingState', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
  });

  it('should clear expanded rows after ungrouping', () => {
    let expandedGroups;
    let groupByColumn;
    const expandedGroupsChangeMock = jest.fn();

    mount(
      <PluginHost>
        <GroupingState
          defaultGrouping={[{ columnName: 'name' }]}
          defaultExpandedGroups={['John']}
          onExpandedGroupsChange={expandedGroupsChangeMock}
        />
        <Template
          name="root"
          connectGetters={getter => (expandedGroups = Array.from(getter('expandedGroups')))}
          connectActions={action => (groupByColumn = action('groupByColumn'))}
        >
          {() => <div />}
        </Template>
      </PluginHost>,
    );

    groupByColumn({ columnName: 'name' });

    expect(expandedGroups).toHaveLength(0);
    expect(expandedGroupsChangeMock.mock.calls[0][0]).toHaveLength(0);
  });

  it('should clear expanded rows after ungrouping nested rows', () => {
    let expandedGroups;
    let groupByColumn;
    const expandedGroupsChangeMock = jest.fn();

    mount(
      <PluginHost>
        <GroupingState
          defaultGrouping={[{ columnName: 'name' }, { columnName: 'age' }]}
          defaultExpandedGroups={['John', 'John|30', 'Mike']}
          onExpandedGroupsChange={expandedGroupsChangeMock}
        />
        <Template
          name="root"
          connectGetters={getter => (expandedGroups = Array.from(getter('expandedGroups')))}
          connectActions={action => (groupByColumn = action('groupByColumn'))}
        >
          {() => <div />}
        </Template>
      </PluginHost>,
    );

    groupByColumn({ columnName: 'age' });

    expect(expandedGroups).toEqual(['John', 'Mike']);
    expect(expandedGroupsChangeMock.mock.calls[0][0]).toEqual(['John', 'Mike']);
  });

  it('should not clear expanded rows after grouping', () => {
    let expandedGroups;
    let groupByColumn;
    const expandedGroupsChangeMock = jest.fn();

    mount(
      <PluginHost>
        <GroupingState
          defaultGrouping={[{ columnName: 'name' }]}
          defaultExpandedGroups={['John', 'Mike']}
          onExpandedGroupsChange={expandedGroupsChangeMock}
        />
        <Template
          name="root"
          connectGetters={getter => (expandedGroups = Array.from(getter('expandedGroups')))}
          connectActions={action => (groupByColumn = action('groupByColumn'))}
        >
          {() => <div />}
        </Template>
      </PluginHost>,
    );

    groupByColumn({ columnName: 'age' });

    expect(expandedGroups).toEqual(['John', 'Mike']);
    expect(expandedGroupsChangeMock.mock.calls).toHaveLength(0);
  });
});
