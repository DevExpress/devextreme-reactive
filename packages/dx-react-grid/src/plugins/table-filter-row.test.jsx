import * as React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { PluginHost } from '@devexpress/dx-react-core';
import {
  tableHeaderRowsWithFilter,
  isFilterTableCell,
  getColumnFilterConfig,
  isFilterTableRow,
  getMessagesFormatter,
} from '@devexpress/dx-grid-core';
import { TableFilterRow } from './table-filter-row';
import { pluginDepsToComponents, getComputedState } from './test-utils';

jest.mock('@devexpress/dx-grid-core', () => ({
  tableHeaderRowsWithFilter: jest.fn(),
  isFilterTableCell: jest.fn(),
  isFilterTableRow: jest.fn(),
  getColumnFilterConfig: jest.fn(),
  getMessagesFormatter: jest.fn(),
}));

const defaultDeps = {
  getter: {
    tableHeaderRows: [{ type: 'undefined', rowId: 1 }],
    filters: [{ columnName: 'a', value: 'b' }],
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
  plugins: ['FilteringState', 'Table'],
};

const defaultProps = {
  cellComponent: () => null,
  rowComponent: () => null,
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
    isFilterTableCell.mockImplementation(() => false);
    isFilterTableRow.mockImplementation(() => false);
    getMessagesFormatter.mockImplementation(messages => key => (messages[key] || key));
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('table layout getters', () => {
    it('should extend tableHeaderRows', () => {
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
    isFilterTableCell.mockImplementation(() => true);

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
    isFilterTableCell.mockImplementation(() => true);
    getColumnFilterConfig.mockImplementation(() => defaultDeps.getter.filters[0]);

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableFilterRow
          {...defaultProps}
        />
      </PluginHost>
    ));

    const valueEditorTemplatePlaceholder = tree
      .find('TemplatePlaceholder')
      .findWhere(node => node.prop('name') === 'valueEditor');

    expect(valueEditorTemplatePlaceholder.prop('params'))
      .toMatchObject({
        column: defaultDeps.template.tableCell.tableColumn.column,
        value: defaultDeps.getter.filters[0].value,
        onValueChange: expect.any(Function),
      });
  });

  it('should render row by using rowComponent', () => {
    isFilterTableRow.mockImplementation(() => true);

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
    isFilterTableCell.mockImplementation(() => true);

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
    expect(getMessage('filterPlaceholder')).toBe('Filter...');
  });
});
