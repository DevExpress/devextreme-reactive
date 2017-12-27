import React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import {
  groupingPanelItems,
  getColumnSortingDirection,
  getMessagesFormatter,
} from '@devexpress/dx-grid-core';
import { PluginHost } from '@devexpress/dx-react-core';
import { GroupingPanel } from './grouping-panel';
import { pluginDepsToComponents } from './test-utils';

jest.mock('@devexpress/dx-grid-core', () => ({
  groupingPanelItems: jest.fn(),
  getColumnSortingDirection: jest.fn(),
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
    toolbarContent: {},
  },
  plugins: ['GroupingState', 'Toolbar'],
};

const defaultProps = {
  layoutComponent: () => null,
  containerComponent: () => null,
  itemComponent: () => null,
  emptyMessageComponent: () => null,
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
    getColumnSortingDirection.mockImplementation(() => 'direction');
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should pass correct parameters to layoutComponent', () => {
    const deps = {
      getter: {
        allowDragging: true,
      },
      plugins: ['DragDropProvider'],
    };
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps, deps)}
        <GroupingPanel
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(tree.find(defaultProps.layoutComponent).props())
      .toMatchObject({
        allowDragging: true,
        onGroup: expect.any(Function),
        onDraftGroup: expect.any(Function),
        onCancelDraftGroup: expect.any(Function),
      });
  });

  it('should pass correct getMessage prop to emptyMessageComponent', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <GroupingPanel
          {...defaultProps}
          layoutComponent={({ emptyMessageComponent: EmptyMessage }) =>
            <EmptyMessage />}
          messages={{
            groupByColumn: 'Group By Column',
          }}
        />
      </PluginHost>
    ));

    const { getMessage } = tree.find(defaultProps.emptyMessageComponent).props();
    expect(getMessage('groupByColumn'))
      .toBe('Group By Column');
  });

  it('should pass correct parameters to itemComponent', () => {
    const deps = {
      plugins: ['SortingState'],
    };
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps, deps)}
        <GroupingPanel
          {...defaultProps}
          layoutComponent={({ itemComponent: Item }) =>
            <Item item={{ column: { name: 'a' } }} />}
          showSortingControls
          showGroupingControls
        />
      </PluginHost>
    ));

    expect(tree.find(defaultProps.itemComponent).props())
      .toMatchObject({
        showSortingControls: true,
        showGroupingControls: true,
        sortingDirection: getColumnSortingDirection(),
        onGroup: expect.any(Function),
      });
  });
});
