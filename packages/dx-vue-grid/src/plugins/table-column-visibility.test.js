import { mount } from '@vue/test-utils';
import {
  visibleTableColumns,
  columnChooserItems,
  toggleColumn,
  tableDataColumnsExist,
  getColumnExtensionValueGetter,
} from '@devexpress/dx-grid-core';
import { DxPluginHost } from '@devexpress/dx-vue-core';
import { PluginDepsToComponents, getComputedState, executeComputedAction } from './test-utils';
import { DxTableColumnVisibility } from './table-column-visibility';

jest.mock('@devexpress/dx-grid-core', () => ({
  visibleTableColumns: jest.fn(),
  columnChooserItems: jest.fn(),
  toggleColumn: jest.fn(),
  tableDataColumnsExist: jest.fn(),
  getColumnExtensionValueGetter: jest.fn(),
}));

const defaultDeps = {
  getter: {
    tableColumns: [
      { column: { name: 'a' } },
      { column: { name: 'b' } },
      { column: { name: 'c' } },
    ],
    columns: [
      { name: 'a' },
      { name: 'b' },
      { name: 'c' },
    ],
  },
  template: {
    table: {},
  },
  plugins: ['DxTable'],
};

const defaultProps = {
  emptyMessageComponent: { name: 'EmptyMessage', render: () => null },
  hiddenColumnNames: [],
};

describe('DxTableColumnVisibility', () => {
  beforeEach(() => {
    toggleColumn.mockImplementation(args => (args));
    visibleTableColumns.mockImplementation(() => [{ column: { name: 'c' } }]);
    columnChooserItems.mockImplementation(args => (args));
    tableDataColumnsExist.mockImplementation(() => false);
    getColumnExtensionValueGetter.mockImplementation(() => () => {});
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getters', () => {
    it('should provide the hiddenColumnNames getter', () => {
      const hiddenColumnNames = ['b', 'a'];
      const tree = mount({
        render() {
          return (
            <DxPluginHost>
              <PluginDepsToComponents deps={defaultDeps} />
              <DxTableColumnVisibility
                {...{ attrs: { ...defaultProps } }}
                hiddenColumnNames={hiddenColumnNames}
              />
            </DxPluginHost>
          );
        },
      });

      expect(getComputedState(tree).hiddenColumnNames)
        .toEqual(hiddenColumnNames);
    });

    it('should call the visibleTableColumns computed with correct arguments', () => {
      const hiddenColumnNames = ['b', 'a'];
      const tree = mount({
        render() {
          return (
            <DxPluginHost>
              <PluginDepsToComponents deps={defaultDeps} />
              <DxTableColumnVisibility
                {...{ attrs: { ...defaultProps } }}
                hiddenColumnNames={hiddenColumnNames}
              />
            </DxPluginHost>
          );
        },
      });

      expect(visibleTableColumns)
        .toHaveBeenCalledWith(defaultDeps.getter.tableColumns, hiddenColumnNames);

      expect(getComputedState(tree).tableColumns)
        .toEqual(visibleTableColumns());
    });
  });

  describe('column extensions', () => {
    it('should correctly call getColumnExtensionValueGetter if columnExtensions prop is defined', () => {
      const columnExtensions = [{ columnName: 'a', togglingEnabled: true }];
      mount({
        render() {
          return (
            <DxPluginHost>
              <PluginDepsToComponents deps={defaultDeps} />
              <DxTableColumnVisibility
                {...{ attrs: { ...defaultProps } }}
                columnTogglingEnabled={false}
                columnExtensions={columnExtensions}
              />
            </DxPluginHost>
          );
        },
      });

      expect(getColumnExtensionValueGetter)
        .toBeCalledWith(columnExtensions, 'togglingEnabled', false);
    });
  });

  describe('actions', () => {
    it('should call toggleColumnVisibility', () => {
      const defaultHiddenColumnNames = ['a', 'b'];
      const nextHiddenColumnNames = ['c', 'd'];
      toggleColumn.mockImplementation(() => nextHiddenColumnNames);

      const tree = mount({
        render() {
          return (
            <DxPluginHost>
              <PluginDepsToComponents deps={defaultDeps} />
              <DxTableColumnVisibility
                {...{ attrs: { ...defaultProps } }}
                hiddenColumnNames={defaultHiddenColumnNames}
              />
            </DxPluginHost>
          );
        },
      });

      executeComputedAction(tree, (actions) => {
        actions.toggleColumnVisibility('a');
      });

      expect(tree.find(DxTableColumnVisibility).emitted()['update:hiddenColumnNames'][0][0])
        .toBe(nextHiddenColumnNames);
      expect(toggleColumn.mock.calls[0][0])
        .toEqual(defaultHiddenColumnNames);
      expect(toggleColumn.mock.calls[0][1])
        .toEqual('a');
    });
  });

  it('should force the empty message rendering if all columns are hidden', () => {
    visibleTableColumns.mockImplementation(() => []);

    const tree = mount({
      render() {
        return (
          <DxPluginHost>
            <PluginDepsToComponents deps={defaultDeps} />
            <DxTableColumnVisibility
              {...{ attrs: { ...defaultProps } }}
              messages={{
                noColumns: 'Nothing to show',
              }}
            />
          </DxPluginHost>
        );
      },
    });
    const { getMessage } = tree.find(defaultProps.emptyMessageComponent).vm.$attrs;

    expect(getMessage('noColumns'))
      .toBe('Nothing to show');
  });
});
