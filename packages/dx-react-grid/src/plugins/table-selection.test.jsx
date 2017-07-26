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
  tableColumnsWithSelection,
  tableBodyRowsWithSelection,
  tableExtraPropsWithSelection,
  isSelectTableCell,
  isSelectAllTableCell,
} from '@devexpress/dx-grid-core';
import { TableSelection } from './table-selection';

jest.mock('@devexpress/dx-grid-core', () => ({
  tableColumnsWithSelection: jest.fn(),
  tableBodyRowsWithSelection: jest.fn(),
  tableExtraPropsWithSelection: jest.fn(),
  isSelectTableCell: jest.fn(),
  isSelectAllTableCell: jest.fn(),
}));

const defaultPluginProps = {
  selectAllCellTemplate: () => null,
  selectCellTemplate: () => null,
  selectionColumnWidth: 100,
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
    tableColumnsWithSelection.mockImplementation(() => 'tableColumnsWithSelection');
    tableBodyRowsWithSelection.mockImplementation(() => 'tableBodyRowsWithSelection');
    tableExtraPropsWithSelection.mockImplementation(() => 'tableExtraPropsWithSelection');
    isSelectTableCell.mockImplementation(() => false);
    isSelectAllTableCell.mockImplementation(() => false);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('table layout getters', () => {
    it('should extend tableBodyRows', () => {
      let tableBodyRows = null;
      // TODO: extract plugin dependencies
      mount(
        <PluginHost>
          <Getter name="tableBodyRows" value="tableBodyRows" />
          <Getter name="selection" value="selection" />
          <Getter name="getRowId" value="getRowId" />
          <TableSelection
            {...defaultPluginProps}
            highlightSelected
          />
          <Template
            name="root"
            connectGetters={getter => (tableBodyRows = getter('tableBodyRows'))}
          >
            {() => <div />}
          </Template>
        </PluginHost>,
      );

      expect(tableBodyRowsWithSelection)
        .toBeCalledWith('tableBodyRows', 'selection', 'getRowId');
      expect(tableBodyRows)
        .toBe('tableBodyRowsWithSelection');
    });

    it('should extend tableColumns', () => {
      let tableColumns = null;
      mount(
        <PluginHost>
          <Getter name="tableColumns" value="tableColumns" />
          <TableSelection
            {...defaultPluginProps}
            selectionColumnWidth={120}
          />
          <Template
            name="root"
            connectGetters={getter => (tableColumns = getter('tableColumns'))}
          >
            {() => <div />}
          </Template>
        </PluginHost>,
      );

      expect(tableColumnsWithSelection)
        .toBeCalledWith('tableColumns', 120);
      expect(tableColumns)
        .toBe('tableColumnsWithSelection');
    });

    it('should extend tableExtraProps', () => {
      let tableExtraProps = null;
      mount(
        <PluginHost>
          <Getter name="tableExtraProps" value="tableExtraProps" />
          <Getter name="getRowId" value="getRowId" />
          <TableSelection
            {...defaultPluginProps}
            selectByRowClick
          />
          <Template
            name="root"
            connectGetters={getter => (tableExtraProps = getter('tableExtraProps'))}
          >
            {() => <div />}
          </Template>
        </PluginHost>,
      );

      expect(tableExtraPropsWithSelection)
        .toBeCalledWith('tableExtraProps', expect.any(Function), 'getRowId');
      expect(tableExtraProps)
        .toBe('tableExtraPropsWithSelection');
    });
  });

  it('should render selectAll cell on select column and heading row intersection', () => {
    isSelectTableCell.mockImplementation(() => true);

    const selectCellTemplate = jest.fn(() => null);

    mount(
      <PluginHost>
        <Getter name="selection" value={[]} />
        <Getter name="availableToSelect" value={[]} />
        <Template name="root">
          <TemplatePlaceholder
            name="tableViewCell"
            params={{ row: { original: 'row' }, column: { original: 'column' }, style: {} }}
          />
        </Template>
        <TableSelection
          {...defaultPluginProps}
          selectCellTemplate={selectCellTemplate}
        />
      </PluginHost>,
    );

    expect(isSelectTableCell)
      .toBeCalledWith({ original: 'row' }, { original: 'column' });
    expect(selectCellTemplate)
      .not.toBeCalledWith(expect.objectContaining({ column: 'column' }));
    expect(selectCellTemplate)
      .toBeCalledWith(expect.objectContaining({
        row: 'row',
        style: {},
      }));
  });

  it('should render select cell on select column and user-defined row intersection', () => {
    isSelectAllTableCell.mockImplementation(() => true);

    const selectAllCellTemplate = jest.fn(() => null);

    mount(
      <PluginHost>
        <Getter name="selection" value={[]} />
        <Getter name="availableToSelect" value={[]} />
        <Template name="root">
          <TemplatePlaceholder
            name="tableViewCell"
            params={{ row: { original: 'row' }, column: { original: 'column' }, style: {} }}
          />
        </Template>
        <TableSelection
          {...defaultPluginProps}
          selectAllCellTemplate={selectAllCellTemplate}
        />
      </PluginHost>,
    );

    expect(isSelectAllTableCell)
      .toBeCalledWith({ original: 'row' }, { original: 'column' });
    expect(selectAllCellTemplate)
      .not.toBeCalledWith(expect.objectContaining({ row: 'row', column: 'column' }));
    expect(selectAllCellTemplate)
      .toBeCalledWith(expect.objectContaining({
        style: {},
      }));
  });
});
