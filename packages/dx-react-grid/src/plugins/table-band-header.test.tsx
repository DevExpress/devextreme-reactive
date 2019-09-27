import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost, TemplatePlaceholder } from '@devexpress/dx-react-core';
import {
  pluginDepsToComponents,
  getComputedState,
  setupConsole,
} from '@devexpress/dx-testing';
import {
  getBandComponent,
  isBandedTableRow,
  isBandedOrHeaderRow,
  tableRowsWithBands,
  tableHeaderColumnChainsWithBands,
  isHeadingTableCell,
  columnBandLevels,
  bandLevelsVisibility,
  columnVisibleIntervals,
  BAND_DUPLICATE_RENDER,
  BAND_EMPTY_CELL,
  BAND_GROUP_CELL,
  BAND_HEADER_CELL,
  BAND_FILL_LEVEL_CELL,
} from '@devexpress/dx-grid-core';
import { TableBandHeader } from './table-band-header';

jest.mock('@devexpress/dx-grid-core', () => ({
  getBandComponent: jest.fn(),
  isBandedTableRow: jest.fn(),
  isBandedOrHeaderRow: jest.fn(),
  tableRowsWithBands: jest.fn(),
  tableHeaderColumnChainsWithBands: jest.fn(),
  isHeadingTableCell: jest.fn(),
  columnBandLevels: jest.fn(),
  bandLevelsVisibility: jest.fn(),
  columnVisibleIntervals: jest.fn(),
  BAND_DUPLICATE_RENDER: 'd',
  BAND_EMPTY_CELL: 'e',
  BAND_GROUP_CELL: 'g',
  BAND_HEADER_CELL: 'h',
}));

const defaultDeps = {
  getter: {
    tableHeaderRows: [],
    tableColumns: [],
    columnVisibleIntervals: 'columnVisibleIntervals',
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
  plugins: ['Table', 'TableHeaderRow'],
};

const defaultProps = {
  columnBands: [{
    title: 'Band',
    children: [
      { columnName: 'column1' },
      { columnName: 'column2' },
    ],
  }],
  cellComponent: () => null,
  rowComponent: () => null,
  bandedHeaderCellComponent: () => null,
  invisibleCellComponent: () => null,
};

describe('TableBandHeader', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
  });

  beforeEach(() => {
    tableRowsWithBands.mockImplementation(() => 'tableRowsWithBands');
    tableHeaderColumnChainsWithBands.mockImplementation(() => 'tableHeaderColumnChainsWithBands');
    columnBandLevels.mockImplementation(() => 'columnBandLevels');
    bandLevelsVisibility.mockImplementation(() => 'bandLevelsVisibility');
    columnVisibleIntervals.mockImplementation(() => 'columnVisibleIntervals');
    isHeadingTableCell.mockImplementation(() => false);
    isBandedTableRow.mockImplementation(() => false);
    isBandedOrHeaderRow.mockImplementation(() => false);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getters', () => {
    it('should provide bandLevels getter', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TableBandHeader
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).bandLevels)
        .toBe('columnBandLevels');
    });

    it('should provide bandLevelsVisibility getter', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TableBandHeader
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).bandLevelsVisibility)
        .toBe('bandLevelsVisibility');
    });

    it('should provide columnVisibleIntervals getter', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TableBandHeader
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).columnVisibleIntervals)
        .toBe('columnVisibleIntervals');
    });

    it('should extend tableHeaderRows', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TableBandHeader
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).tableHeaderRows)
        .toBe('tableRowsWithBands');
      expect(tableRowsWithBands)
        .toBeCalledWith(
          defaultDeps.getter.tableHeaderRows,
          defaultProps.columnBands,
          defaultDeps.getter.tableColumns,
        );
    });
  });

  it('should call getBandComponent with correct parameters', () => {
    isBandedOrHeaderRow.mockReturnValue(true);
    getBandComponent.mockReturnValue({
      type: null,
    });
    mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableBandHeader
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(getBandComponent)
      .toBeCalledWith(
        defaultDeps.template.tableCell,
        'tableRowsWithBands',
        defaultDeps.getter.tableColumns,
        defaultProps.columnBands,
        'tableHeaderColumnChainsWithBands',
        'columnVisibleIntervals',
        'bandLevelsVisibility',
      );
  });

  it('can render banded header cell', () => {
    isHeadingTableCell.mockImplementation(() => true);
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableBandHeader
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(isHeadingTableCell)
      .toBeCalledWith(
        defaultDeps.template.tableCell.tableRow,
        defaultDeps.template.tableCell.tableColumn,
      );
    expect(tree.find(defaultProps.bandedHeaderCellComponent).props())
      .toMatchObject({
        ...defaultDeps.template.tableCell,
        component: expect.any(Function),
      });
  });

  it('should render banded header rows correctly', () => {
    isBandedTableRow.mockImplementation(() => true);
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableBandHeader
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(isBandedTableRow)
      .toBeCalledWith(defaultDeps.template.tableCell.tableRow);
    expect(tree.find(defaultProps.rowComponent).props())
      .toMatchObject({
        ...defaultDeps.template.tableRow,
      });
  });

  it('should render band duplicates correctly', () => {
    isBandedOrHeaderRow.mockImplementation(() => true);
    getBandComponent.mockImplementation(() => ({ type: BAND_DUPLICATE_RENDER }));
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableBandHeader
          {...defaultProps}
        />
      </PluginHost>
    ));

    const target = tree
      .find(TemplatePlaceholder)
      .filterWhere(node => node.parent().is('TemplateConnectorBase'));

    expect(isBandedOrHeaderRow)
      .toBeCalledWith(defaultDeps.template.tableCell.tableRow);
    expect(target.exists())
      .toBeTruthy();
  });

  it('should render empty band cell correctly', () => {
    isBandedOrHeaderRow.mockImplementation(() => true);
    getBandComponent.mockImplementation(() => ({ type: BAND_EMPTY_CELL }));
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableBandHeader
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(isBandedOrHeaderRow)
      .toBeCalledWith(defaultDeps.template.tableCell.tableRow);
    expect(tree.find(defaultProps.invisibleCellComponent).exists())
      .toBeTruthy();
  });

  it('should render band group cells correctly', () => {
    isBandedOrHeaderRow.mockImplementation(() => true);
    getBandComponent.mockImplementation(() => ({
      type: BAND_GROUP_CELL,
      payload: { value: 'a', otherProp: 1 },
    }));
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableBandHeader
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(isBandedOrHeaderRow)
      .toBeCalledWith(defaultDeps.template.tableCell.tableRow);
    expect(tree.find(defaultProps.cellComponent).props())
      .toMatchObject({
        ...defaultDeps.template.tableCell,
        children: 'a',
        otherProp: 1,
      });
  });

  it('should render band header cells correctly', () => {
    isBandedOrHeaderRow.mockImplementationOnce(() => true);
    getBandComponent.mockImplementation(() => ({
      type: BAND_HEADER_CELL,
      payload: { value: 'a' },
    }));
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableBandHeader
          {...defaultProps}
        />
      </PluginHost>
    ));

    const tableCellTemplatePlaceholder = tree
      .find('TemplatePlaceholderBase')
      .findWhere(node => node.prop('name') === 'tableCell')
      .last();

    expect(isBandedOrHeaderRow)
      .toBeCalledWith(defaultDeps.template.tableCell.tableRow);
    expect(tableCellTemplatePlaceholder.props())
      .toMatchObject({
        params: {
          ...defaultDeps.template.tableCell,
          value: 'a',
        },
      });
  });

  it('should render filling cell correctly', () => {
    isBandedOrHeaderRow.mockImplementationOnce(() => true);
    getBandComponent.mockImplementation(() => ({
      type: BAND_FILL_LEVEL_CELL,
      payload: { value: 'a' },
    }));
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableBandHeader
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(tree.find(defaultProps.cellComponent).props())
      .toEqual({
        ...defaultDeps.template.tableCell,
        style: {
          whiteSpace: 'pre',
        },
        children: ' ',
        value: 'a',
      });
  });
});
