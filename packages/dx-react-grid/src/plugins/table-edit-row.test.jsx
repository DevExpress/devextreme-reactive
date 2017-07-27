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
  getRowChange,
  tableRowsWithEditing,
  isEditNewTableCell,
  isEditExistingTableCell,
} from '@devexpress/dx-grid-core';
import { TableEditRow } from './table-edit-row';

jest.mock('@devexpress/dx-grid-core', () => ({
  getRowChange: jest.fn(),
  tableRowsWithEditing: jest.fn(),
  isEditNewTableCell: jest.fn(),
  isEditExistingTableCell: jest.fn(),
}));

const defaultPluginProps = {
  editCellTemplate: () => null,
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
    getRowChange.mockImplementation(() => ({}));
    tableRowsWithEditing.mockImplementation(() => 'tableRowsWithEditing');
    isEditNewTableCell.mockImplementation(() => false);
    isEditExistingTableCell.mockImplementation(() => false);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('table layout getters', () => {
    it('should extend tableBodyRows', () => {
      let tableBodyRows = null;
      mount(
        <PluginHost>
          <Getter name="tableBodyRows" value="tableBodyRows" />
          <Getter name="editingRows" value="editingRows" />
          <Getter name="addedRows" value="addedRows" />
          <Getter name="getRowId" value="getRowId" />
          <TableEditRow
            {...defaultPluginProps}
            rowHeight={120}
          />
          <Template
            name="root"
            connectGetters={getter => (tableBodyRows = getter('tableBodyRows'))}
          >
            {() => <div />}
          </Template>
        </PluginHost>,
      );

      expect(tableRowsWithEditing)
        .toBeCalledWith('tableBodyRows', 'editingRows', 'addedRows', 'getRowId', 120);
      expect(tableBodyRows)
        .toBe('tableRowsWithEditing');
    });
  });

  it('should render edit cell on user-defined column and added row intersection', () => {
    isEditNewTableCell.mockImplementation(() => true);

    const editCellTemplate = jest.fn(() => null);

    mount(
      <PluginHost>
        <Template name="root">
          <TemplatePlaceholder
            name="tableViewCell"
            params={{ row: { original: 'row' }, column: { original: 'column' }, style: {} }}
          />
        </Template>
        <TableEditRow
          {...defaultPluginProps}
          editCellTemplate={editCellTemplate}
        />
      </PluginHost>,
    );

    expect(isEditNewTableCell)
      .toBeCalledWith({ original: 'row' }, { original: 'column' });
    expect(editCellTemplate)
      .toBeCalledWith(expect.objectContaining({
        row: 'row',
        column: 'column',
        style: {},
      }));
  });

  it('should render edit cell on user-defined column and edit row intersection', () => {
    isEditExistingTableCell.mockImplementation(() => true);

    const editCellTemplate = jest.fn(() => null);

    mount(
      <PluginHost>
        <Template name="root">
          <TemplatePlaceholder
            name="tableViewCell"
            params={{ row: { original: 'row' }, column: { original: 'column' }, style: {} }}
          />
        </Template>
        <TableEditRow
          {...defaultPluginProps}
          editCellTemplate={editCellTemplate}
        />
      </PluginHost>,
    );

    expect(isEditExistingTableCell)
      .toBeCalledWith({ original: 'row' }, { original: 'column' });
    expect(editCellTemplate)
      .toBeCalledWith(expect.objectContaining({
        row: 'row',
        column: 'column',
        style: {},
      }));
  });
});
