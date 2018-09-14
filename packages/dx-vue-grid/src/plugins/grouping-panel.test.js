import { mount } from '@vue/test-utils';
import { setupConsole } from '@devexpress/dx-testing';
import {
  groupingPanelItems,
  getColumnSortingDirection,
} from '@devexpress/dx-grid-core';
import { DxPluginHost } from '@devexpress/dx-vue-core';
import { DxGroupingPanel } from './grouping-panel';
import { PluginDepsToComponents } from './test-utils';

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
  },
  template: {
    toolbarContent: {},
  },
  plugins: ['DxGroupingState', 'DxToolbar'],
};

const defaultProps = {
  layoutComponent: { name: 'Layout', render() { return null; } },
  containerComponent: { name: 'Container', render() { return null; } },
  itemComponent: { name: 'Item', render() { return null; } },
  emptyMessageComponent: { name: 'EmptyMessage', render() { return null; } },
};

describe('DxGroupingPanel', () => {
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

  it('should pass correct getMessage prop to emptyMessageComponent', () => {
    const layoutComponent = {
      name: 'LayoutComponent',
      props: {
        emptyMessageComponent: {
          type: Object,
        },
      },
      render() {
        const { emptyMessageComponent: EmptyMessage } = this;
        return (
          <EmptyMessage />
        );
      },
    };
    const tree = mount({
      render() {
        return (
          <DxPluginHost>
            <PluginDepsToComponents deps={defaultDeps} />
            <DxGroupingPanel
              {...{ attrs: { ...defaultProps } }}
              layoutComponent={layoutComponent}
              messages={{
                groupByColumn: 'Group By Column',
              }}
            />
          </DxPluginHost>
        );
      },
    });

    const { getMessage } = tree.find(defaultProps.emptyMessageComponent).vm.$attrs;
    expect(getMessage('groupByColumn')).toBe('Group By Column');
  });

  it('should pass correct parameters to itemComponent', () => {
    const deps = {
      plugins: ['DxSortingState'],
    };
    const layoutComponent = {
      name: 'LayoutComponent',
      props: {
        itemComponent: {
          type: Object,
        },
      },
      render() {
        const { itemComponent: Item } = this;
        return (
          <Item item={{ column: { name: 'a' } }} />
        );
      },
    };
    const tree = mount({
      render() {
        return (
          <DxPluginHost>
            <PluginDepsToComponents
              deps={{ ...defaultDeps, plugins: [...deps.plugins, ...defaultDeps.plugins] }}
            />
            <DxGroupingPanel
              {...{ attrs: { ...defaultProps } }}
              layoutComponent={layoutComponent}
              showSortingControls
              showGroupingControls
            />
          </DxPluginHost>
        );
      },
    });

    expect(tree.find(defaultProps.itemComponent).vm.$attrs)
      .toMatchObject({
        showSortingControls: true,
        showGroupingControls: true,
        sortingDirection: getColumnSortingDirection(),
      });
  });
});
