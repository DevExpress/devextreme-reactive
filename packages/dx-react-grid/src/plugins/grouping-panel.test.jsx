import React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { groupingPanelItems, getMessagesFormatter } from '@devexpress/dx-grid-core';
import { PluginHost } from '@devexpress/dx-react-core';
import { GroupingPanel } from './grouping-panel';
import { pluginDepsToComponents } from './test-utils';

jest.mock('@devexpress/dx-grid-core', () => ({
  groupingPanelItems: jest.fn(),
  getMessagesFormatter: jest.fn(),
}));

const defaultDeps = {
  getter: {
    columns: [],
    draftGrouping: [],
    sorting: [],
  },
  action: {
    groupByColumn: jest.fn(),
    setColumnSorting: jest.fn(),
    draftGroupingChange: jest.fn(),
    cancelGroupingChange: jest.fn(),
  },
  template: {
    header: {},
  },
  plugins: ['GroupingState'],
};

describe('GroupingPanel', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
  });

  beforeEach(() => {
    getMessagesFormatter.mockImplementation(messages => key => (messages[key] || key));
    groupingPanelItems.mockImplementation(() => []);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should pass correct getMessage prop to groupPanelTemplate', () => {
    const groupPanelTemplate = jest.fn().mockReturnValue(null);
    const deps = {};
    mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps, deps)}
        <GroupingPanel
          groupPanelTemplate={groupPanelTemplate}
          messages={{
            groupByColumn: 'Group By Column',
          }}
        />
      </PluginHost>
    ));

    const { getMessage } = groupPanelTemplate.mock.calls[0][0];

    expect(getMessage('groupByColumn')).toBe('Group By Column');
  });
});
