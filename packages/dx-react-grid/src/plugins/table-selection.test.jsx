import React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { PluginHost } from '@devexpress/dx-react-core';
import {
  tableColumnsWithSelection,
  isSelectTableCell,
  isSelectAllTableCell,
  isDataTableRow,
} from '@devexpress/dx-grid-core';
import { TableSelection } from './table-selection';
import { pluginDepsToComponents, getComputedState } from './test-utils';

jest.mock('@devexpress/dx-grid-core', () => ({
  tableColumnsWithSelection: jest.fn(),
  isSelectTableCell: jest.fn(),
  isSelectAllTableCell: jest.fn(),
  isDataTableRow: jest.fn(),
}));

const defaultDeps = {
  getter: {
    tableColumns: [{ type: 'undefined', column: 'column' }],
    tableBodyRows: [{ type: 'undefined', rowId: 1, row: 'row' }],
    selection: [1, 2],
    availableToSelect: [1, 2, 3, 4],
  },
  action: {
    setRowsSelection: jest.fn(),
  },
  template: {
    tableViewCell: {
      tableRow: { type: 'undefined', rowId: 1, row: 'row' },
      tableColumn: { type: 'undefined', column: 'column' },
      style: {},
    },
    tableViewRow: {
      tableRow: { type: 'undefined', rowId: 1, row: 'row' },
      style: {},
    },
  },
  plugins: ['SelectionState', 'TableView'],
};

const defaultProps = {
  selectAllCellTemplate: () => null,
  selectCellTemplate: () => null,
  selectRowTemplate: () => null,
  selectionColumnWidth: 100,
};

describe('Table Selection', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
  });

  beforeEach(() => {
    tableColumnsWithSelection.mockImplementation(() => 'tableColumnsWithSelection');
    isSelectTableCell.mockImplementation(() => false);
    isSelectAllTableCell.mockImplementation(() => false);
    isDataTableRow.mockImplementation(() => false);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('table layout getter', () => {
    it('should extend tableColumns', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TableSelection
            {...defaultProps}
            selectionColumnWidth={120}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).getters.tableColumns)
        .toBe('tableColumnsWithSelection');
      expect(tableColumnsWithSelection)
        .toBeCalledWith(defaultDeps.getter.tableColumns, 120);
    });
  });

  it('should render select cell on select column and user-defined row intersection', () => {
    isSelectTableCell.mockImplementation(() => true);
    const selectCellTemplate = jest.fn(() => null);

    mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableSelection
          {...defaultProps}
          selectCellTemplate={selectCellTemplate}
        />
      </PluginHost>
    ));

    expect(isSelectTableCell)
      .toBeCalledWith(
        defaultDeps.template.tableViewCell.tableRow,
        defaultDeps.template.tableViewCell.tableColumn,
      );
    expect(selectCellTemplate)
      .toBeCalledWith(expect.objectContaining({
        ...defaultDeps.template.tableViewCell,
        row: defaultDeps.template.tableViewCell.tableRow.row,
      }));
  });

  it('should render selectAll cell on select column and heading row intersection', () => {
    isSelectAllTableCell.mockImplementation(() => true);
    const selectAllCellTemplate = jest.fn(() => null);

    mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableSelection
          {...defaultProps}
          selectAllCellTemplate={selectAllCellTemplate}
        />
      </PluginHost>
    ));

    expect(isSelectAllTableCell)
      .toBeCalledWith(
        defaultDeps.template.tableViewCell.tableRow,
        defaultDeps.template.tableViewCell.tableColumn,
      );
    expect(selectAllCellTemplate)
      .toBeCalledWith(expect.objectContaining(defaultDeps.template.tableViewCell));
  });

  it('should render row by using selectRowTemplate if selectByRowClick is true', () => {
    const selectRowTemplate = jest.fn(() => null);
    isDataTableRow.mockImplementation(() => true);

    mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableSelection
          {...defaultProps}
          selectRowTemplate={selectRowTemplate}
          selectByRowClick
        />
      </PluginHost>
    ));
    selectRowTemplate.mock.calls[0][0].changeSelected();

    expect(isDataTableRow).toBeCalledWith(defaultDeps.template.tableViewRow.tableRow);

    expect(selectRowTemplate)
      .toBeCalledWith(expect.objectContaining({
        ...defaultDeps.template.tableViewRow,
        selectByRowClick: true,
        selected: false,
      }));

    expect(defaultDeps.action.setRowsSelection)
      .toBeCalledWith({
        rowIds: [defaultDeps.template.tableViewRow.tableRow.rowId],
      });
  });

  it('should render row by using selectRowTemplate if highlightSelected is true', () => {
    const selectRowTemplate = jest.fn(() => null);
    isDataTableRow.mockImplementation(() => true);

    mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableSelection
          {...defaultProps}
          selectRowTemplate={selectRowTemplate}
          highlightSelected
        />
      </PluginHost>
    ));

    expect(isDataTableRow).toBeCalledWith(defaultDeps.template.tableViewRow.tableRow);
    expect(selectRowTemplate)
      .toBeCalledWith(expect.objectContaining({
        ...defaultDeps.template.tableViewRow,
        selected: true,
      }));
  });

  it('should not use selectRowTemplate if highlightSelected & selectByRowClick are false', () => {
    const selectRowTemplate = jest.fn(() => null);

    mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableSelection
          {...defaultProps}
          selectRowTemplate={selectRowTemplate}
        />
      </PluginHost>
    ));

    expect(selectRowTemplate.mock.calls).toHaveLength(0);
  });
});
