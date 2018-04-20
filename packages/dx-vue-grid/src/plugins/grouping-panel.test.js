import { mount } from '@vue/test-utils';
import { setupConsole } from '@devexpress/dx-testing';
import {
  groupingPanelItems,
  getColumnSortingDirection,
  getMessagesFormatter,
} from '@devexpress/dx-grid-core';
import { PluginHost } from '@devexpress/dx-vue-core';
import { GroupingPanel } from './grouping-panel';
import { PluginDepsToComponents } from './test-utils';

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
    isColumnSortingEnabled: () => true,
    isColumnGroupingEnabled: () => true,
  },
  action: {
    changeColumnGrouping: jest.fn(),
    changeColumnSorting: jest.fn(),
    draftColumnGrouping: jest.fn(),
    cancelColumnGroupingDraft: jest.fn(),
  },
  template: {
    toolbarContent: {},
  },
  plugins: ['GroupingState', 'Toolbar'],
};

const defaultProps = {
  layoutComponent: { name: 'Layout', render() { return null; } },
  containerComponent: { name: 'Container', render() { return null; } },
  itemComponent: { name: 'Item', render() { return null; } },
  emptyMessageComponent: { name: 'EmptyMessage', render() { return null; } },
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

  fit('should pass correct getMessage prop to emptyMessageComponent', () => {
    const tree = mount({
      render() {
        return (
          <PluginHost>
            <PluginDepsToComponents deps={defaultDeps} />
            <GroupingPanel
              {...{ attrs: { ...defaultProps } }}
              layoutComponent={defaultProps.emptyMessageComponent}
              messages={{
                groupByColumn: 'Group By Column',
              }}
            />
          </PluginHost>
        );
      },
    });

    const { getMessage } = tree.find(defaultProps.emptyMessageComponent).vm.$attrs;
    expect(getMessage('groupByColumn')).toBe('Group By Column');
  });

  it('should pass correct parameters to itemComponent', () => {
    const deps = {
      plugins: ['SortingState'],
    };
    const tree = mount((
      <PluginHost>
        <PluginDepsToComponents deps={defaultDeps} depsOverrides={deps} />
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
