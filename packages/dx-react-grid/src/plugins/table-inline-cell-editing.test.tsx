import * as React from 'react';
import { mount } from 'enzyme';
import { pluginDepsToComponents, setupConsole } from '@devexpress/dx-testing';
import { PluginHost } from '@devexpress/dx-react-core';
import {
  TABLE_DATA_TYPE,
  getRowChange,
  isInlineEditTableCell,
} from '@devexpress/dx-grid-core';
import { TableInlineCellEditing } from './table-inline-cell-editing';

jest.mock('@devexpress/dx-grid-core', () => ({
  getRowChange: jest.fn(),
  isInlineEditTableCell: jest.fn(),
}));

const defaultDeps = {
  getter: {
    tableBodyRows: [{ type: 'undefined', rowId: 1 }],
    editingCells: [
      { rowId: 1, columnName: 'a' },
      { rowId: 2, columnName: 'a' },
    ],
    rowChanges: [{ 1: { a: 'text' } }],
    getCellValue: jest.fn(),
    createRowChange: jest.fn(),
    isColumnEditingEnabled: () => true,
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
      tableRow: { type: TABLE_DATA_TYPE, rowId: 1, row: { a: 'a' } },
      tableColumn: { type: TABLE_DATA_TYPE, column: 'column' },
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
  });
  afterAll(() => {
    resetConsole();
  });

  beforeEach(() => {
    getRowChange.mockImplementation(() => ({}));
    isInlineEditTableCell.mockImplementation(() => false);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render edit cell on user-defined column and edit row intersection', () => {
    isInlineEditTableCell.mockImplementation(() => true);

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
    expect(isInlineEditTableCell)
      .toBeCalledWith(
        defaultDeps.template.tableCell.tableRow,
        defaultDeps.template.tableCell.tableColumn,
        defaultDeps.getter.editingCells,
      );
    expect(tree.find(defaultProps.cellComponent).props())
      .toMatchObject({
        ...defaultDeps.template.tableCell,
        row: defaultDeps.template.tableCell.tableRow.row,
        column: defaultDeps.template.tableCell.tableColumn.column,
      });
  });

  it('can render custom editors', () => {
    isInlineEditTableCell.mockImplementation(() => true);

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

  it('should pass disabled prop to the custom editor if editing is not allowed', () => {
    isInlineEditTableCell.mockImplementation(() => true);

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps, {
          getter: {
            isColumnEditingEnabled: () => false,
          },
        })}
        <TableInlineCellEditing
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

  it('should pass autoFocus, onBlur, onFocus and onKeyDown props into cellComponent', () => {
    isInlineEditTableCell.mockImplementation(() => true);

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps, {
          getter: {
            isColumnEditingEnabled: () => false,
          },
        })}
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
