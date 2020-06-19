import * as React from 'react';
import { mount } from 'enzyme';
import { pluginDepsToComponents, setupConsole } from '@devexpress/dx-testing';
import {
  groupingPanelItems,
  getColumnSortingDirection,
  TOP_POSITION,
} from '@devexpress/dx-grid-core';
import { PluginHost } from '@devexpress/dx-react-core';
import { GroupingPanel } from './grouping-panel';

jest.mock('@devexpress/dx-grid-core', () => ({
  groupingPanelItems: jest.fn(),
  getColumnSortingDirection: jest.fn(),
}));

const defaultDeps = {
  getter: {
    columns: [],
    draftGrouping: [],
    sorting: [],
    isColumnSortingEnabled: () => true,
    isColumnGroupingEnabled: () => true,
  },
  action: {
    changeColumnGrouping: jest.fn(),
    changeColumnSorting: jest.fn(),
    draftColumnGrouping: jest.fn(),
    cancelColumnGroupingDraft: jest.fn(),
    scrollToRow: jest.fn(),
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
    groupingPanelItems.mockImplementation(() => []);
    getColumnSortingDirection.mockImplementation(() => 'direction');
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should pass correct parameters to layoutComponent', () => {
    const deps = {
      getter: {
        draggingEnabled: true,
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
        draggingEnabled: true,
        onGroup: expect.any(Function),
        onGroupDraft: expect.any(Function),
        onGroupDraftCancel: expect.any(Function),
      });
  });

  it('should pass correct getMessage prop to emptyMessageComponent', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <GroupingPanel
          {...defaultProps}
          layoutComponent={({ emptyMessageComponent: EmptyMessage }) => <EmptyMessage />}
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
          layoutComponent={({ itemComponent: Item }) => <Item item={{ column: { name: 'a' } }} />}
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

  it('should not call scroll up on group if data is not remote', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <GroupingPanel
          {...defaultProps}
        />
      </PluginHost>
    ));
    tree.find(defaultProps.layoutComponent)
      .prop('onGroup')('a');

    expect(defaultDeps.action.scrollToRow)
      .not.toHaveBeenCalled();
  });

  it('should scroll up on group if data is remote', () => {
    const deps = {
      ...defaultDeps,
      getter: {
        ...defaultDeps.getter,
        isDataRemote: true,
      },
    };
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(deps)}
        <GroupingPanel
          {...defaultProps}
        />
      </PluginHost>
    ));
    tree.find(defaultProps.layoutComponent)
      .prop('onGroup')('a');

    expect(deps.action.scrollToRow)
      .toHaveBeenCalledTimes(1);
    expect(deps.action.scrollToRow.mock.calls[0][0])
      .toBe(TOP_POSITION);
  });
});
