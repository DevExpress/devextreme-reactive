import * as React from 'react';
import { mount } from 'enzyme';
import { pluginDepsToComponents, getComputedState, setupConsole } from '@devexpress/dx-testing';
import { PluginHost } from '@devexpress/dx-react-core';
import {
  tableColumnsWithSelection,
  isSelectTableCell,
  isSelectAllTableCell,
  isDataTableRow,
} from '@devexpress/dx-grid-core';
import { TableSelection } from './table-selection';

jest.mock('@devexpress/dx-grid-core', () => ({
  ...jest.requireActual('@devexpress/dx-grid-core'),
  tableColumnsWithSelection: jest.fn(),
  isSelectTableCell: jest.fn(),
  isSelectAllTableCell: jest.fn(),
  isDataTableRow: jest.fn(),
}));

const defaultDeps = {
  getter: {
    selection: [1, 2],
  },
  action: {
    toggleSelection: jest.fn(),
  },
  template: {
    tableCell: {
      tableRow: { type: 'undefined', rowId: 1, row: 'row' },
      tableColumn: { type: 'undefined', column: 'column' },
      style: {},
    },
    tableRow: {
      tableRow: { type: 'undefined', rowId: 1, row: 'row' },
      style: {},
    },
  },
  plugins: ['SelectionState', 'Table', 'IntegratedSelection'],
};

const defaultProps = {
  headerCellComponent: () => null,
  cellComponent: () => null,
  rowComponent: () => null,
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

  describe('table selection getter', () => {
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

      expect(getComputedState(tree).tableColumns)
        .toBe('tableColumnsWithSelection');
      expect(tableColumnsWithSelection)
        .toBeCalledWith(defaultDeps.getter.tableColumns, 120, true);
    });

    describe('highlightSelectedRow getter', () => {
      it('should not be registered when highlightRow is disabled', () => {
        const tree = mount((
          <PluginHost>
            {pluginDepsToComponents(defaultDeps)}
            <TableSelection
              {...defaultProps}
            />
          </PluginHost>
        ));

        expect(getComputedState(tree).highlightSelectedRow)
          .toBeFalsy();
      });

      it('should provide "true" when highlightRow is enabled', () => {
        const tree = mount((
          <PluginHost>
            {pluginDepsToComponents(defaultDeps)}
            <TableSelection
              {...defaultProps}
              highlightRow
            />
          </PluginHost>
        ));

        expect(getComputedState(tree).highlightSelectedRow)
          .toBeTruthy();
      });
    });
  });

  it('should render select cell on select column and user-defined row intersection', () => {
    isSelectTableCell.mockImplementation(() => true);

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableSelection
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(isSelectTableCell)
      .toBeCalledWith(
        defaultDeps.template.tableCell.tableRow,
        defaultDeps.template.tableCell.tableColumn,
      );
    expect(tree.find(defaultProps.cellComponent).props())
      .toMatchObject({
        ...defaultDeps.template.tableCell,
        row: defaultDeps.template.tableCell.tableRow.row,
      });
  });

  it('should render selectAll cell on select column and heading row intersection', () => {
    isSelectAllTableCell.mockImplementation(() => true);

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableSelection
          {...defaultProps}
          showSelectAll
        />
      </PluginHost>
    ));

    expect(isSelectAllTableCell)
      .toBeCalledWith(
        defaultDeps.template.tableCell.tableRow,
        defaultDeps.template.tableCell.tableColumn,
      );
    expect(tree.find(defaultProps.headerCellComponent).props())
      .toMatchObject(defaultDeps.template.tableCell);
  });

  it('should render row using rowComponent if selectByRowClick is true', () => {
    isDataTableRow.mockImplementation(() => true);

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableSelection
          {...defaultProps}
          selectByRowClick
        />
      </PluginHost>
    ));
    tree.find(defaultProps.rowComponent).props().onToggle();
    expect(isDataTableRow).toBeCalledWith(defaultDeps.template.tableRow.tableRow);

    expect(tree.find(defaultProps.rowComponent).props())
      .toMatchObject({
        ...defaultDeps.template.tableRow,
        selectByRowClick: true,
        highlighted: false,
      });

    expect(defaultDeps.action.toggleSelection.mock.calls[0][0])
      .toEqual({
        rowIds: [defaultDeps.template.tableRow.tableRow.rowId],
      });
  });

  it('should render row by using rowComponent if highlightRow is true', () => {
    isDataTableRow.mockImplementation(() => true);

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableSelection
          {...defaultProps}
          highlightRow
        />
      </PluginHost>
    ));

    expect(isDataTableRow)
      .toBeCalledWith(defaultDeps.template.tableRow.tableRow);
    expect(tree.find(defaultProps.rowComponent).props())
      .toMatchObject({
        ...defaultDeps.template.tableRow,
        highlighted: true,
      });
  });

  it('should not use rowComponent if highlightRow & selectByRowClick are false', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableSelection
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(tree.find(defaultProps.rowComponent).exists())
      .toBeFalsy();
  });

  it('should pass the selectByRowClick prop to row component', () => {
    isDataTableRow.mockImplementation(() => true);
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableSelection
          {...defaultProps}
          highlightRow
          selectByRowClick={false}
        />
      </PluginHost>
    ));

    expect(tree.find(defaultProps.rowComponent).prop('selectByRowClick'))
      .toBe(false);
  });
});
