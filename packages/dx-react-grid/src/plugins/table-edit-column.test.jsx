import React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { PluginHost } from '@devexpress/dx-react-core';
import {
  tableColumnsWithEditing,
  isHeadingEditCommandsTableCell,
  isDataEditCommandsTableCell,
  isEditNewRowCommandsTableCell,
  isEditExistingRowCommandsTableCell,
} from '@devexpress/dx-grid-core';
import { TableEditColumn } from './table-edit-column';
import { pluginDepsToComponents, getComputedState } from './test-utils';

jest.mock('@devexpress/dx-grid-core', () => ({
  tableColumnsWithEditing: jest.fn(),
  isHeadingEditCommandsTableCell: jest.fn(),
  isDataEditCommandsTableCell: jest.fn(),
  isEditNewRowCommandsTableCell: jest.fn(),
  isEditExistingRowCommandsTableCell: jest.fn(),
}));

const defaultDeps = {
  getter: {
    tableColumns: [{ type: 'undefined' }],
  },
  action: {
    addRow: jest.fn(),
    cancelAddedRows: jest.fn(),
    commitAddedRows: jest.fn(),
    startEditRows: jest.fn(),
    stopEditRows: jest.fn(),
    cancelChangedRows: jest.fn(),
    commitChangedRows: jest.fn(),
    deleteRows: jest.fn(),
    commitDeletedRows: jest.fn(),
  },
  template: {
    tableViewCell: {
      tableRow: { type: 'undefined', rowId: 1, row: 'row' },
      tableColumn: { type: 'undefined', column: 'column' },
      style: {},
    },
  },
  plugins: ['EditingState', 'TableView'],
};

const defaultProps = {
  cellTemplate: () => null,
  headingCellTemplate: () => null,
  commandTemplate: () => null,
};

describe('TableHeaderRow', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
  });

  beforeEach(() => {
    tableColumnsWithEditing.mockImplementation(() => 'tableColumnsWithEditing');
    isHeadingEditCommandsTableCell.mockImplementation(() => false);
    isDataEditCommandsTableCell.mockImplementation(() => false);
    isEditNewRowCommandsTableCell.mockImplementation(() => false);
    isEditExistingRowCommandsTableCell.mockImplementation(() => false);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('table layout getters', () => {
    it('should extend tableColumns', () => {
      const tree = mount(
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TableEditColumn
            {...defaultProps}
            width={120}
          />
        </PluginHost>,
      );

      expect(getComputedState(tree).getters.tableColumns)
        .toBe('tableColumnsWithEditing');
      expect(tableColumnsWithEditing)
        .toBeCalledWith(defaultDeps.getter.tableColumns, 120);
    });
  });

  it('should render edit commands cell on edit-commands column and header row intersection', () => {
    isHeadingEditCommandsTableCell.mockImplementation(() => true);
    const headingCellTemplate = jest.fn(() => null);

    mount(
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableEditColumn
          {...defaultProps}
          headingCellTemplate={headingCellTemplate}
        />
      </PluginHost>,
    );

    expect(isHeadingEditCommandsTableCell)
      .toBeCalledWith(
        defaultDeps.template.tableViewCell.tableRow,
        defaultDeps.template.tableViewCell.tableColumn,
      );
    expect(headingCellTemplate)
      .toBeCalledWith(expect.objectContaining({
        ...defaultDeps.template.tableViewCell,
      }));
  });

  it('should render edit commands cell on edit-commands column and user-defined row intersection', () => {
    isDataEditCommandsTableCell.mockImplementation(() => true);
    const cellTemplate = jest.fn(() => null);

    mount(
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableEditColumn
          {...defaultProps}
          cellTemplate={cellTemplate}
        />
      </PluginHost>,
    );

    expect(isHeadingEditCommandsTableCell)
      .toBeCalledWith(
        defaultDeps.template.tableViewCell.tableRow,
        defaultDeps.template.tableViewCell.tableColumn,
      );
    expect(cellTemplate)
      .toBeCalledWith(expect.objectContaining({
        ...defaultDeps.template.tableViewCell,
        row: defaultDeps.template.tableViewCell.tableRow.row,
        isEditing: false,
      }));
  });

  it('should render edit commands cell on edit-commands column and added row intersection', () => {
    isEditNewRowCommandsTableCell.mockImplementation(() => true);
    const cellTemplate = jest.fn(() => null);

    mount(
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableEditColumn
          {...defaultProps}
          cellTemplate={cellTemplate}
        />
      </PluginHost>,
    );

    expect(isEditNewRowCommandsTableCell)
      .toBeCalledWith(
        defaultDeps.template.tableViewCell.tableRow,
        defaultDeps.template.tableViewCell.tableColumn,
      );
    expect(cellTemplate)
      .toBeCalledWith(expect.objectContaining({
        ...defaultDeps.template.tableViewCell,
        row: defaultDeps.template.tableViewCell.tableRow.row,
        isEditing: true,
      }));
  });

  it('should render edit commands cell on edit-commands column and editing row intersection', () => {
    isEditExistingRowCommandsTableCell.mockImplementation(() => true);
    const cellTemplate = jest.fn(() => null);

    mount(
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableEditColumn
          {...defaultProps}
          cellTemplate={cellTemplate}
        />
      </PluginHost>,
    );

    expect(isEditExistingRowCommandsTableCell)
      .toBeCalledWith(
        defaultDeps.template.tableViewCell.tableRow,
        defaultDeps.template.tableViewCell.tableColumn,
      );
    expect(cellTemplate)
      .toBeCalledWith(expect.objectContaining({
        ...defaultDeps.template.tableViewCell,
        row: defaultDeps.template.tableViewCell.tableRow.row,
        isEditing: true,
      }));
  });
});
