import { mount } from '@vue/test-utils';
import { setupConsole } from '@devexpress/dx-testing';
import { DxPluginHost } from '@devexpress/dx-vue-core';
import {
  tableHeaderRowsWithFilter,
  isFilterTableCell,
  isFilterTableRow,
  getColumnFilterOperations,
  isFilterValueEmpty,
  getColumnFilterConfig,
} from '@devexpress/dx-grid-core';
import { DxTableFilterRow } from './table-filter-row';
import { PluginDepsToComponents, getComputedState } from './test-utils';

jest.mock('@devexpress/dx-grid-core', () => ({
  tableHeaderRowsWithFilter: jest.fn(),
  isFilterTableCell: jest.fn(),
  isFilterTableRow: jest.fn(),
  getColumnFilterConfig: jest.fn(),
  getColumnFilterOperations: jest.fn(),
  isFilterValueEmpty: jest.fn(),
}));

const defaultDeps = {
  getter: {
    tableHeaderRows: [{ type: 'undefined', rowId: 1 }],
    filters: [{ columnName: 'a', value: 'b' }],
    isColumnFilteringEnabled: () => true,
  },
  action: {
    changeColumnFilter: jest.fn(),
  },
  template: {
    tableCell: {
      tableRow: { type: 'undefined', rowId: 1, row: 'row' },
      tableColumn: { type: 'undefined', column: { name: 'a' } },
      style: {},
    },
    tableRow: {
      tableRow: { type: 'undefined', rowId: 1, row: 'row' },
      style: {},
    },
  },
  plugins: ['DxFilteringState', 'DxTable'],
};

const defaultProps = {
  cellComponent: { name: 'Cell', render() { return <div>{this.$slots.default}</div>; } },
  rowComponent: { name: 'Row', render() { return null; } },
  iconComponent: { name: 'Icon', render() { return null; } },
  editorComponent: { name: 'Editor', render() { return null; } },
  filterSelectorComponent: { name: 'FilterSelector', render() { return null; } },
};

describe('DxTableFilterRow', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
  });

  beforeEach(() => {
    tableHeaderRowsWithFilter.mockImplementation(() => 'tableHeaderRowsWithFilter');
    isFilterTableCell.mockImplementation(() => true);
    isFilterTableRow.mockImplementation(() => false);
    getColumnFilterOperations.mockImplementation(() => []);
    isFilterValueEmpty.mockImplementation(() => false);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('table layout getters', () => {
    it('should extend tableHeaderRows', () => {
      const tree = mount({
        render() {
          return (
            <DxPluginHost>
              <PluginDepsToComponents deps={defaultDeps} />
              <DxTableFilterRow
                {...{ attrs: { ...defaultProps } }}
                rowHeight={120}
              />
            </DxPluginHost>
          );
        },
      });

      expect(getComputedState(tree).tableHeaderRows)
        .toBe('tableHeaderRowsWithFilter');
      expect(tableHeaderRowsWithFilter)
        .toBeCalledWith(defaultDeps.getter.tableHeaderRows, 120);
    });
  });

  it('should render heading cell on user-defined column and filter row intersection', () => {
    isFilterTableCell.mockImplementation(() => true);

    const tree = mount({
      render() {
        return (
          <DxPluginHost>
            <PluginDepsToComponents deps={defaultDeps} />
            <DxTableFilterRow
              {...{ attrs: { ...defaultProps } }}
            />
          </DxPluginHost>
        );
      },
    });

    expect(isFilterTableCell)
      .toBeCalledWith(
        defaultDeps.template.tableCell.tableRow,
        defaultDeps.template.tableCell.tableColumn,
      );

    expect(tree.find(defaultProps.cellComponent).vm.$attrs)
      .toMatchObject({
        ...defaultDeps.template.tableCell,
        column: defaultDeps.template.tableCell.tableColumn.column,
      });
  });

  it('should render row by using rowComponent', () => {
    isFilterTableRow.mockImplementation(() => true);

    const tree = mount({
      render() {
        return (
          <DxPluginHost>
            <PluginDepsToComponents deps={defaultDeps} />
            <DxTableFilterRow
              {...{ attrs: { ...defaultProps } }}
            />
          </DxPluginHost>
        );
      },
    });
    expect(isFilterTableRow)
      .toBeCalledWith(defaultDeps.template.tableRow.tableRow);
    expect(tree.find(defaultProps.rowComponent).vm.$attrs)
      .toMatchObject(defaultDeps.template.tableRow);
  });

  it('should pass getMessage function to filterTableCellTemplate', () => {
    isFilterTableCell.mockImplementation(() => true);

    const tree = mount({
      render() {
        return (
          <DxPluginHost>
            <PluginDepsToComponents deps={defaultDeps} />
            <DxTableFilterRow
              {...{ attrs: { ...defaultProps } }}
              messages={{
                filterPlaceholder: 'Filter...',
              }}
            />
          </DxPluginHost>
        );
      },
    });

    const { getMessage } = tree.find(defaultProps.cellComponent).vm.$attrs;
    expect(getMessage('filterPlaceholder')).toBe('Filter...');
  });

  it('should render a cell with a disabled filtering editor if filtering is not allowed for the column', () => {
    const deps = {
      getter: {
        isColumnFilteringEnabled: () => false,
      },
    };
    const tree = mount({
      render() {
        return (
          <DxPluginHost>
            <PluginDepsToComponents deps={defaultDeps} depsOverrides={deps} />
            <DxTableFilterRow
              {...{ attrs: { ...defaultProps } }}
            />
          </DxPluginHost>
        );
      },
    });

    expect(tree.find(defaultProps.editorComponent).vm.$attrs.disabled)
      .toBeTruthy();
  });

  it('should change filter correctly on editor value change', () => {
    const tree = mount({
      render() {
        return (
          <DxPluginHost>
            <PluginDepsToComponents deps={defaultDeps} />
            <DxTableFilterRow
              {...{ attrs: { ...defaultProps } }}
            />
          </DxPluginHost>
        );
      },
    });
    tree.find(defaultProps.editorComponent)
      .vm.$listeners.changeValue('a');

    expect(defaultDeps.action.changeColumnFilter.mock.calls[0][0])
      .toMatchObject({ config: { value: 'a' } });
  });

  it('should reset the filter when an empty value is set', () => {
    isFilterValueEmpty.mockImplementation(() => true);
    const tree = mount({
      render() {
        return (
          <DxPluginHost>
            <PluginDepsToComponents deps={defaultDeps} />
            <DxTableFilterRow
              {...{ attrs: { ...defaultProps } }}
            />
          </DxPluginHost>
        );
      },
    });
    tree.find(defaultProps.editorComponent)
      .vm.$listeners.changeValue({ target: {} });

    expect(defaultDeps.action.changeColumnFilter.mock.calls[0][0])
      .toMatchObject({ config: null });
  });

  it('can render filter selector', () => {
    let tree = mount({
      render() {
        return (
          <DxPluginHost>
            <PluginDepsToComponents deps={defaultDeps} />
            <DxTableFilterRow
              {...{ attrs: { ...defaultProps } }}
            />
          </DxPluginHost>
        );
      },
    });

    expect(tree.find(defaultProps.filterSelectorComponent).exists())
      .toBeFalsy();

    tree = mount({
      render() {
        return (
          <DxPluginHost>
            <PluginDepsToComponents deps={defaultDeps} />
            <DxTableFilterRow
              {...{ attrs: { ...defaultProps } }}
              showFilterSelector
            />
          </DxPluginHost>
        );
      },
    });

    expect(tree.find(defaultProps.filterSelectorComponent).exists())
      .toBeTruthy();
  });

  it('should change filter correctly on filter operation change', () => {
    getColumnFilterConfig.mockImplementation(() => ({ value: 1 }));
    const tree = mount({
      render() {
        return (
          <DxPluginHost>
            <PluginDepsToComponents deps={defaultDeps} />
            <DxTableFilterRow
              {...{ attrs: { ...defaultProps } }}
              showFilterSelector
            />
          </DxPluginHost>
        );
      },
    });
    tree.find(defaultProps.filterSelectorComponent)
      .vm.$listeners.changeValue('a');

    expect(defaultDeps.action.changeColumnFilter.mock.calls[0][0])
      .toMatchObject({ config: { operation: 'a' } });
  });

  it('should not change filter on filter operation change if filter value is empty', () => {
    isFilterValueEmpty.mockImplementation(() => true);
    const tree = mount({
      render() {
        return (
          <DxPluginHost>
            <PluginDepsToComponents deps={defaultDeps} />
            <DxTableFilterRow
              {...{ attrs: { ...defaultProps } }}
              showFilterSelector
            />
          </DxPluginHost>
        );
      },
    });
    tree.find(defaultProps.filterSelectorComponent)
      .vm.$listeners.changeValue('a');

    expect(defaultDeps.action.changeColumnFilter)
      .not.toHaveBeenCalled();
  });

  it('should use the first available operation as the FilterSelector value by default', () => {
    getColumnFilterOperations.mockImplementation(() => ['a', 'b', 'c']);
    const tree = mount({
      render() {
        return (
          <DxPluginHost>
            <PluginDepsToComponents deps={defaultDeps} />
            <DxTableFilterRow
              {...{ attrs: { ...defaultProps } }}
              showFilterSelector
            />
          </DxPluginHost>
        );
      },
    });

    expect(tree.find(defaultProps.filterSelectorComponent).vm.$attrs.value)
      .toBe('a');
  });
});
