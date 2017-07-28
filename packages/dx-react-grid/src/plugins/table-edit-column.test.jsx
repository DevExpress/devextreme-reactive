import React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import {
  Getter,
  Template,
  TemplatePlaceholder,
  PluginHost,
} from '@devexpress/dx-react-core';
import {
  tableColumnsWithEditing,
  isHeaderEditCommandsTableCell,
  isDataEditCommandsTableCell,
  isEditNewRowCommandsTableCell,
  isEditExistingRowCommandsTableCell,
} from '@devexpress/dx-grid-core';
import { TableEditColumn } from './table-edit-column';

jest.mock('@devexpress/dx-grid-core', () => ({
  tableColumnsWithEditing: jest.fn(),
  isHeaderEditCommandsTableCell: jest.fn(),
  isDataEditCommandsTableCell: jest.fn(),
  isEditNewRowCommandsTableCell: jest.fn(),
  isEditExistingRowCommandsTableCell: jest.fn(),
}));

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
    isHeaderEditCommandsTableCell.mockImplementation(() => false);
    isDataEditCommandsTableCell.mockImplementation(() => false);
    isEditNewRowCommandsTableCell.mockImplementation(() => false);
    isEditExistingRowCommandsTableCell.mockImplementation(() => false);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('table layout getters', () => {
    it('should extend tableColumns', () => {
      let tableColumns = null;
      mount(
        <PluginHost>
          <Getter name="tableColumns" value="tableColumns" />
          <TableEditColumn
            {...defaultProps}
            width={120}
          />
          <Template
            name="root"
            connectGetters={getter => (tableColumns = getter('tableColumns'))}
          >
            {() => <div />}
          </Template>
        </PluginHost>,
      );

      expect(tableColumnsWithEditing)
        .toBeCalledWith('tableColumns', 120);
      expect(tableColumns)
        .toBe('tableColumnsWithEditing');
    });
  });

  it('should render edit commands cell on edit-commands column and header row intersection', () => {
    isHeaderEditCommandsTableCell.mockImplementation(() => true);

    const headingCellTemplate = jest.fn(() => null);
    const tableCellArgs = { tableRow: { row: 'row' }, tableColumn: { column: 'column' }, style: {} };

    mount(
      <PluginHost>
        <Template name="root">
          <TemplatePlaceholder
            name="tableViewCell"
            params={tableCellArgs}
          />
        </Template>
        <TableEditColumn
          {...defaultProps}
          headingCellTemplate={headingCellTemplate}
        />
      </PluginHost>,
    );

    expect(isHeaderEditCommandsTableCell)
      .toBeCalledWith(tableCellArgs.tableRow, tableCellArgs.tableColumn);
    expect(headingCellTemplate)
      .toBeCalledWith(expect.objectContaining({
        ...tableCellArgs,
      }));
  });

  it('should render edit commands cell on edit-commands column and user-defined row intersection', () => {
    isDataEditCommandsTableCell.mockImplementation(() => true);

    const cellTemplate = jest.fn(() => null);
    const tableCellArgs = { tableRow: { row: 'row' }, tableColumn: { column: 'column' }, style: {} };

    mount(
      <PluginHost>
        <Template name="root">
          <TemplatePlaceholder
            name="tableViewCell"
            params={tableCellArgs}
          />
        </Template>
        <TableEditColumn
          {...defaultProps}
          cellTemplate={cellTemplate}
        />
      </PluginHost>,
    );

    expect(isHeaderEditCommandsTableCell)
      .toBeCalledWith(tableCellArgs.tableRow, tableCellArgs.tableColumn);
    expect(cellTemplate)
      .toBeCalledWith(expect.objectContaining({
        ...tableCellArgs,
        row: tableCellArgs.tableRow.row,
        isEditing: false,
      }));
  });

  it('should render edit commands cell on edit-commands column and added row intersection', () => {
    isEditNewRowCommandsTableCell.mockImplementation(() => true);

    const cellTemplate = jest.fn(() => null);
    const tableCellArgs = { tableRow: { row: 'row' }, tableColumn: { column: 'column' }, style: {} };

    mount(
      <PluginHost>
        <Template name="root">
          <TemplatePlaceholder
            name="tableViewCell"
            params={tableCellArgs}
          />
        </Template>
        <TableEditColumn
          {...defaultProps}
          cellTemplate={cellTemplate}
        />
      </PluginHost>,
    );

    expect(isEditNewRowCommandsTableCell)
      .toBeCalledWith(tableCellArgs.tableRow, tableCellArgs.tableColumn);
    expect(cellTemplate)
      .toBeCalledWith(expect.objectContaining({
        ...tableCellArgs,
        row: tableCellArgs.tableRow.row,
        isEditing: true,
      }));
  });

  it('should render edit commands cell on edit-commands column and editing row intersection', () => {
    isEditExistingRowCommandsTableCell.mockImplementation(() => true);

    const cellTemplate = jest.fn(() => null);
    const tableCellArgs = { tableRow: { row: 'row' }, tableColumn: { column: 'column' }, style: {} };

    mount(
      <PluginHost>
        <Template name="root">
          <TemplatePlaceholder
            name="tableViewCell"
            params={tableCellArgs}
          />
        </Template>
        <TableEditColumn
          {...defaultProps}
          cellTemplate={cellTemplate}
        />
      </PluginHost>,
    );

    expect(isEditExistingRowCommandsTableCell)
      .toBeCalledWith(tableCellArgs.tableRow, tableCellArgs.tableColumn);
    expect(cellTemplate)
      .toBeCalledWith(expect.objectContaining({
        ...tableCellArgs,
        row: tableCellArgs.tableRow.row,
        isEditing: true,
      }));
  });
});
