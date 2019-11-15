import * as React from 'react';
import { mount } from 'enzyme';
import { pluginDepsToComponents, setupConsole } from '@devexpress/dx-testing';
import { PluginHost } from '@devexpress/dx-react-core';
import {
  TABLE_DATA_TYPE,
  getRowChange,
  rowsWithEditingCells,
  columnsWithEditingCells,
} from '@devexpress/dx-grid-core';
import { TableInlineCellEditing } from './table-inline-cell-editing';

jest.mock('@devexpress/dx-grid-core', () => ({
  getRowChange: jest.fn(),
  rowsWithEditingCells: jest.fn(),
  columnsWithEditingCells: jest.fn(),
}));

const defaultDeps = {
  getter: {
    tableBodyRows: [{ type: 'undefined', rowId: 1 }],
    tableColumns: [{ type: 'undefined', columnName: 'a' }],
    editingCells: [
      { rowId: 1, columnName: 'a' },
    ],
    rowChanges: [{ 1: { a: 'text' } }],
    getCellValue: jest.fn(),
    createRowChange: jest.fn(),
    isColumnEditingEnabled: jest.fn(),
  },
  action: {
    changeRow: jest.fn(),
    startEditCells: jest.fn(),
    stopEditCells: jest.fn(),
    commitChangedRows: jest.fn(),
    cancelChangedRows: jest.fn(),
  },
  template: {
    tableCell: {
      tableRow: { type: TABLE_DATA_TYPE, rowId: 1, row: { a: 'a' }, hasEditCell: true },
      tableColumn: { type: TABLE_DATA_TYPE, column: { name: 'column' }, hasEditCell: true },
      style: {},
    },
    tableRow: {
      tableRow: { type: TABLE_DATA_TYPE, rowId: 1, row: { a: 'a' } },
      style: {},
    },
  },
  plugins: ['EditingState', 'Table'],
};

const defaultProps = {
  cellComponent: () => null,
  startEditAction: 'click',
  selectTextOnEditStart: false,
};

describe('TableInlineCellEditing', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
    rowsWithEditingCells.mockImplementation(() => 'rowsWithEditingCells');
    columnsWithEditingCells.mockImplementation(() => 'columnsWithEditingCells');
  });
  afterAll(() => {
    resetConsole();
  });

  beforeEach(() => {
    getRowChange.mockImplementation(() => ({}));
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render edit cell on user-defined column and edit row intersection', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableInlineCellEditing
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(defaultDeps.getter.getCellValue)
      .toBeCalledWith(
        { ...defaultDeps.template.tableCell.tableRow.row },
        defaultDeps.template.tableCell.tableColumn.column.name,
      );
    expect(tree.find(defaultProps.cellComponent).props())
      .toMatchObject({
        ...defaultDeps.template.tableCell,
        row: defaultDeps.template.tableCell.tableRow.row,
        column: defaultDeps.template.tableCell.tableColumn.column,
      });
  });

  it('can render custom editors', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps, {
          getter: {
            isColumnEditingEnabled: () => true,
          },
        })}
        <TableInlineCellEditing
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
        row: defaultDeps.template.tableCell.tableRow.row,
        value: defaultDeps.getter.getCellValue(),
        onValueChange: expect.any(Function),
        disabled: false,
      });
  });

  it('should call "isColumnEditingEnabled" to check if cell\'s editing is disabled', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps, {
          getter: {
            editingCells: [],
          },
          template: {
            tableCell: {
              tableRow: { type: TABLE_DATA_TYPE, rowId: 1, row: { a: 'a' } },
              tableColumn: { type: TABLE_DATA_TYPE, column: { name: 'column' } },
              style: {},
            },
          },
        })}
        <TableInlineCellEditing
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(defaultDeps.getter.isColumnEditingEnabled)
      .toBeCalledWith('column');
  });

  it('should pass autoFocus, onBlur, onFocus and onKeyDown props into cellComponent', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableInlineCellEditing
          {...defaultProps}
        />
      </PluginHost>
    ));
    const cellComponent = tree.find('cellComponent');

    expect(cellComponent.prop('autoFocus'))
      .toBeDefined();
    expect(cellComponent.prop('onBlur'))
      .toBeDefined();
    expect(cellComponent.prop('onFocus'))
      .toBeDefined();
    expect(cellComponent.prop('onKeyDown'))
      .toBeDefined();
  });
});
