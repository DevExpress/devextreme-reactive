import * as React from 'react';
import { mount } from 'enzyme';
import { pluginDepsToComponents, getComputedState, setupConsole } from '@devexpress/dx-testing';
import { PluginHost } from '@devexpress/dx-react-core';
import {
  tableHeaderRowsWithFilter,
  isFilterTableCell,
  getColumnFilterConfig,
  isFilterTableRow,
  getColumnFilterOperations,
  isFilterValueEmpty,
  getSelectedFilterOperation,
  TOP_POSITION,
} from '@devexpress/dx-grid-core';
import { TableFilterRow } from './table-filter-row';

jest.mock('@devexpress/dx-grid-core', () => ({
  ...jest.requireActual('@devexpress/dx-grid-core'),
  tableHeaderRowsWithFilter: jest.fn(),
  isFilterTableCell: jest.fn(),
  isFilterTableRow: jest.fn(),
  getColumnFilterConfig: jest.fn(),
  getColumnFilterOperations: jest.fn(),
  isFilterValueEmpty: jest.fn(),
  getSelectedFilterOperation: jest.fn(),
}));

const defaultDeps = {
  getter: {
    tableHeaderRows: [{ type: 'undefined', rowId: 1 }],
    filters: [{ columnName: 'a', value: 'b' }],
    isColumnFilteringEnabled: () => true,
  },
  action: {
    changeColumnFilter: jest.fn(),
    scrollToRow: jest.fn(),
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
  plugins: ['FilteringState', 'Table'],
};

const defaultProps = {
  // eslint-disable-next-line react/prop-types
  cellComponent: ({ children }) => (
    <div>
      {children}
    </div>
  ),
  rowComponent: () => null,
  editorComponent: () => null,
  filterSelectorComponent: () => null,
  iconComponent: () => null,
  toggleButtonComponent: () => null,
};

describe('TableFilterRow', () => {
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
    getSelectedFilterOperation.mockImplementation(() => 'filterOperation');
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('table layout getters', () => {
    it('should extend tableHeaderRows', () => {
      isFilterTableCell.mockImplementation(() => false);

      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TableFilterRow
            {...defaultProps}
            rowHeight={120}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).tableHeaderRows)
        .toBe('tableHeaderRowsWithFilter');
      expect(tableHeaderRowsWithFilter)
        .toBeCalledWith(defaultDeps.getter.tableHeaderRows, 120);
    });
  });

  it('should render heading cell on user-defined column and filter row intersection', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableFilterRow
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(isFilterTableCell)
      .toBeCalledWith(
        defaultDeps.template.tableCell.tableRow,
        defaultDeps.template.tableCell.tableColumn,
      );
    expect(tree.find(defaultProps.cellComponent).props())
      .toMatchObject({
        ...defaultDeps.template.tableCell,
        column: defaultDeps.template.tableCell.tableColumn.column,
      });
  });

  it('can render custom editor', () => {
    getColumnFilterConfig.mockImplementation(() => defaultDeps.getter.filters[0]);

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps, {
          getter: {
            isColumnFilteringEnabled: () => true,
          },
        })}
        <TableFilterRow
          {...defaultProps}
        />
      </PluginHost>
    ));

    const valueEditorTemplatePlaceholder = tree
      .find('TemplatePlaceholderBase')
      .findWhere(node => node.prop('name') === 'valueEditor').last();

    expect(valueEditorTemplatePlaceholder.prop('params'))
      .toMatchObject({
        column: defaultDeps.template.tableCell.tableColumn.column,
        value: defaultDeps.getter.filters[0].value,
        onValueChange: expect.any(Function),
        disabled: false,
      });
  });

  it('should pass disabled prop to the custom editor if filtering is disabled', () => {
    getColumnFilterConfig.mockImplementation(() => defaultDeps.getter.filters[0]);

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps, {
          getter: {
            isColumnFilteringEnabled: () => false,
          },
        })}
        <TableFilterRow
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(tree
      .find('TemplatePlaceholderBase')
      .findWhere(node => node.prop('name') === 'valueEditor').last().prop('params'),
    )
      .toMatchObject({ disabled: true });
  });

  it('should render row by using rowComponent', () => {
    isFilterTableRow.mockImplementation(() => true);
    isFilterTableCell.mockImplementation(() => false);

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableFilterRow
          {...defaultProps}
        />
      </PluginHost>
    ));
    expect(isFilterTableRow)
      .toBeCalledWith(defaultDeps.template.tableRow.tableRow);
    expect(tree.find(defaultProps.rowComponent).props())
      .toMatchObject(defaultDeps.template.tableRow);
  });

  it('should pass getMessage function to filterTableCellTemplate', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableFilterRow
          {...defaultProps}
          messages={{
            filterPlaceholder: 'Filter...',
          }}
        />
      </PluginHost>
    ));

    const { getMessage } = tree.find(defaultProps.cellComponent).props();
    expect(getMessage('filterPlaceholder'))
      .toBe('Filter...');
  });

  // tslint:disable-next-line: max-line-length
  it('should render a cell with a disabled filtering editor if filtering is not allowed for the column', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps, {
          getter: {
            isColumnFilteringEnabled: () => false,
          },
        })}
        <TableFilterRow
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(tree.find(defaultProps.editorComponent).prop('disabled'))
      .toBeTruthy();
  });

  it('should change filter correctly on editor value change', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableFilterRow
          {...defaultProps}
        />
      </PluginHost>
    ));
    tree.find(defaultProps.editorComponent)
      .prop('onChange')('a');

    expect(defaultDeps.action.changeColumnFilter.mock.calls[0][0])
      .toMatchObject({ config: { value: 'a' } });
  });

  it('should reset the filter when an empty value is set', () => {
    isFilterValueEmpty.mockImplementation(() => true);
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableFilterRow
          {...defaultProps}
        />
      </PluginHost>
    ));
    tree.find(defaultProps.editorComponent)
      .prop('onChange')({ target: { } });

    expect(defaultDeps.action.changeColumnFilter.mock.calls[0][0])
      .toMatchObject({ config: null });
  });

  it('should pass undefined as an empty value to EditorComponent', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableFilterRow
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(tree.find(defaultProps.editorComponent).prop('value'))
      .toBeUndefined();
  });

  it('can render filter selector', () => {
    let tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableFilterRow
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(tree.find(defaultProps.filterSelectorComponent).exists())
      .toBeFalsy();

    tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableFilterRow
          {...defaultProps}
          showFilterSelector
        />
      </PluginHost>
    ));

    expect(tree.find(defaultProps.filterSelectorComponent).exists())
      .toBeTruthy();
  });

  it('should change filter correctly on filter operation change', () => {
    getColumnFilterConfig.mockImplementation(() => ({ value: 1 }));
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableFilterRow
          {...defaultProps}
          showFilterSelector
        />
      </PluginHost>
    ));
    tree.find(defaultProps.filterSelectorComponent)
      .prop('onChange')('a');

    expect(defaultDeps.action.changeColumnFilter.mock.calls[0][0])
      .toMatchObject({ config: { operation: 'a' } });
  });

  it('should not change filter on filter operation change if filter value is empty', () => {
    isFilterValueEmpty.mockImplementation(() => true);
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableFilterRow
          {...defaultProps}
          showFilterSelector
        />
      </PluginHost>
    ));
    tree.find(defaultProps.filterSelectorComponent)
      .prop('onChange')('a');

    expect(defaultDeps.action.changeColumnFilter)
      .not.toHaveBeenCalled();
  });

  it('should calculate the FilterSelector value', () => {
    const filter = { columnName: 'a', value: 'b', operation: 'startsWith' };
    const columnFilterOperations = ['a', 'b', 'c'];
    getColumnFilterConfig.mockImplementation(() => filter);
    getColumnFilterOperations.mockImplementation(() => columnFilterOperations);

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableFilterRow
          {...defaultProps}
          showFilterSelector
        />
      </PluginHost>
    ));
    const tableFilterRow = tree.find(TableFilterRow);
    const filterSelectorValue = tree.find(defaultProps.filterSelectorComponent).prop('value');

    expect(getSelectedFilterOperation)
      .toBeCalledWith(
        tableFilterRow.instance().state.filterOperations,
        defaultDeps.template.tableCell.tableColumn.column.name,
        filter,
        columnFilterOperations,
      );
    expect(filterSelectorValue)
      .toBe('filterOperation');
  });

  it('should not call scroll up on filter if data is not remote', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableFilterRow
          {...defaultProps}
        />
      </PluginHost>
    ));
    tree.find(defaultProps.editorComponent)
      .prop('onChange')('a');

    expect(defaultDeps.action.scrollToRow)
      .not.toHaveBeenCalled();
  });

  it('should scroll up on filter if data is remote', () => {
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
        <TableFilterRow
          {...defaultProps}
        />
      </PluginHost>
    ));
    tree.find(defaultProps.editorComponent)
      .prop('onChange')('a');

    expect(deps.action.scrollToRow)
      .toHaveBeenCalledTimes(1);
    expect(deps.action.scrollToRow.mock.calls[0][0])
      .toBe(TOP_POSITION);
  });
});
