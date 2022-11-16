import * as React from 'react';
import { mount } from 'enzyme';
import { pluginDepsToComponents, getComputedState } from '@devexpress/dx-testing';
import { PluginHost } from '@devexpress/dx-react-core';
import {
  closeGroupGetter,
  rowsToExport,
  buildGroupTree,
  groupOutlineLevels,
  exportSummaryGetter,
  maximumGroupLevel,
} from '@devexpress/dx-grid-core';
import {
  GridExporterCore,
} from './grid-exporter-core';
import {
  createWorkbook,
  createWorksheet,
} from './helpers';

import {
  GroupingState,
  IntegratedGrouping,
  SummaryState,
  IntegratedSummary,
  SelectionState,
  FilteringState,
  IntegratedFiltering,
  IntegratedSorting,
  SortingState,
} from '@devexpress/dx-react-grid';

/* tslint:disable no-submodule-imports */
import {
  defaultSummaryMessages,
} from '../../../dx-react-grid/src/components/summary/constants';
import {
  TableColumnsWithGrouping, TableColumnsWithDataRowsGetter,
  VisibleTableColumns, OrderedTableColumns, GridCoreGetters,
} from '../../../dx-react-grid/src/plugins/internal';
/* tslint:enable no-submodule-imports */

jest.mock('../../../dx-react-grid/src/plugins/internal', () => ({
  GridCoreGetters: () => null,
  TableColumnsWithGrouping: () => null,
  TableColumnsWithDataRowsGetter: () => null,
  VisibleTableColumns: () => null,
  OrderedTableColumns: () => null,
}));

jest.mock('@devexpress/dx-grid-core', () => ({
  getColumnExtensionValueGetter: jest.fn(),
  groupedRows: jest.fn(),
  expandedGroupRows: jest.fn(),
  groupCollapsedRowsGetter: jest.fn(),
  rowsToExport: jest.fn(),
  groupOutlineLevels: jest.fn(),
  buildGroupTree: jest.fn(),
  maximumGroupLevel: jest.fn(),
  closeGroupGetter: jest.fn(),
  closeSheet: jest.fn(),
  exportHeader: jest.fn(),
  exportRows: jest.fn(),
  exportSummaryGetter: jest.fn(),
  prepareGroupSummaryItems: jest.fn(),
  unwrappedFilteredRows: jest.fn(),
  filteredCollapsedRowsGetter: jest.fn(),
  filterExpression: jest.fn(),
  filteredRows: jest.fn(),
  sortedRows: jest.fn(),
}));

jest.mock('./helpers', () => ({
  createWorkbook: jest.fn(),
  createWorksheet: jest.fn(),
}));

const defaultProps = {
  rows: [],
  columns: [],
  getRowId: () => {},
  getCellValue: () => {},
  onSave: jest.fn(),
};

const defaultDeps = {
  getter: {
    rows: [],
    columns: [],
    tableColumns: [],
    grouping: [],
    groupSummaryItems: [],
    getCollapsedRows: () => null,
    getRowId: () => null,
    isGroupRow: () => null,
  },
  action: {
    performExport: jest.fn(),
    finishExport: jest.fn(),
  },
};

describe('GridExporter', () => {
  beforeEach(() => {
    rowsToExport.mockReturnValue('rowsToExport');
    buildGroupTree.mockReturnValue('buildGroupTree');
    groupOutlineLevels.mockReturnValue('groupOutlineLevels');
    maximumGroupLevel.mockReturnValue('maximumGroupLevel');
    exportSummaryGetter.mockReturnValue('exportSummaryGetter');
    createWorkbook.mockReturnValue('workbook');
    createWorksheet.mockReturnValue('worksheet');
    closeGroupGetter.mockReturnValue('closeGroupGetter');
  });

  afterEach(jest.clearAllMocks);

  it('should export grid when rendered', () => {
    mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <GridExporterCore {...defaultProps} />
      </PluginHost>
    ));

    expect(defaultDeps.action.performExport)
      .toHaveBeenCalledTimes(1);
    expect(defaultDeps.action.finishExport)
      .toHaveBeenCalledTimes(1);
  });

  describe('getters', () => {
    it('should provide grid basic getters', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <GridExporterCore {...defaultProps} />
        </PluginHost>
      ));

      expect(tree.find(GridCoreGetters).props())
        .toEqual({
          rows: defaultProps.rows,
          columns: defaultProps.columns,
          getRowId: defaultProps.getRowId,
          getCellValue: defaultProps.getCellValue,
        });
    });

    it('should provide tableColumns', () => {
      const columnExtensions = [{ columnName: 'a', width: 200 }];
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <GridExporterCore {...defaultProps} columnExtensions={columnExtensions} />
        </PluginHost>
      ));

      expect(tree.find(TableColumnsWithDataRowsGetter).props())
        .toEqual({
          columnExtensions,
        });
    });

    it('should provide workbook', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <GridExporterCore {...defaultProps} />
          {/* NOTE: exporter overwrites the root template */}
          {pluginDepsToComponents({})}
        </PluginHost>
      ));

      expect(getComputedState(tree).workbook)
        .toBe('workbook');
    });

    it('should provide worksheet', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <GridExporterCore {...defaultProps} />
          {pluginDepsToComponents({})}
        </PluginHost>
      ));

      expect(getComputedState(tree).worksheet)
        .toBe('worksheet');
    });

    it('should provide maxGroupLevel', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <GridExporterCore {...defaultProps} />
          {pluginDepsToComponents({})}
        </PluginHost>
      ));

      expect(getComputedState(tree).maxGroupLevel)
        .toBe('maximumGroupLevel');
      expect(maximumGroupLevel)
        .toHaveBeenCalledWith(
          defaultDeps.getter.grouping,
        );
    });

    it('should provide groupOutlineLevels', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <GridExporterCore {...defaultProps} />
          {pluginDepsToComponents({})}
        </PluginHost>
      ));

      expect(getComputedState(tree).outlineLevels)
        .toBe('groupOutlineLevels');
      expect(groupOutlineLevels)
        .toHaveBeenCalledWith(
          defaultDeps.getter.grouping,
        );
    });

    it('should provide isExporting getter', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <GridExporterCore {...defaultProps} />
          {pluginDepsToComponents({})}
        </PluginHost>
      ));

      expect(getComputedState(tree).isExporting)
        .toBe(true);
    });

    it('should extend rows', () => {
      const selection = ['1', '2'];
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <GridExporterCore
            {...defaultProps}
            selection={selection}
            exportSelected
          />
          {pluginDepsToComponents({})}
        </PluginHost>
      ));

      expect(getComputedState(tree).rows)
        .toBe('rowsToExport');
      expect(rowsToExport)
        .toHaveBeenCalledWith(
          defaultDeps.getter.rows,
          selection,
          defaultDeps.getter.grouping,
          defaultDeps.getter.getCollapsedRows,
          defaultDeps.getter.getRowId,
          defaultDeps.getter.isGroupRow,
        );
    });

    it('should provide groupTree', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <GridExporterCore {...defaultProps} />
          {/* NOTE: exporter overwrites the root template */}
          {pluginDepsToComponents({})}
        </PluginHost>
      ));

      expect(getComputedState(tree).groupTree)
        .toBe('buildGroupTree');
      expect(buildGroupTree)
        .toHaveBeenCalledWith(
          'rowsToExport',
          'groupOutlineLevels',
          defaultDeps.getter.grouping,
          defaultDeps.getter.isGroupRow,
          defaultDeps.getter.groupSummaryItems,
        );
    });

    it('should provide exportSummary function', () => {
      const customizeSummaryCell = () => {};
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <GridExporterCore
            {...defaultProps}
            customizeSummaryCell={customizeSummaryCell}
          />
          {pluginDepsToComponents({})}
        </PluginHost>
      ));

      expect(getComputedState(tree).exportSummary)
        .toBe('exportSummaryGetter');
      expect(exportSummaryGetter)
        .toHaveBeenCalledWith(
          'worksheet',
          defaultDeps.getter.columns,
          customizeSummaryCell,
          defaultSummaryMessages,
        );
    });

    it('should provide getCloseGroup function', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <GridExporterCore
            {...defaultProps}
          />
          {pluginDepsToComponents({})}
        </PluginHost>
      ));

      expect(getComputedState(tree).getCloseGroup)
        .toBe('closeGroupGetter');
      expect(closeGroupGetter)
        .toHaveBeenCalledWith(
          'worksheet',
          'buildGroupTree',
          'groupOutlineLevels',
          'maximumGroupLevel',
          defaultDeps.getter.groupSummaryItems,
          'exportSummaryGetter',
        );
    });

  });

  describe('feature plugins', () => {
    describe('grouping', () => {
      it('should render grouping plugins if grouping is provided', () => {
        const grouping = [{ columnName: 'a' }];
        const groupColumnExtensions = [{ columnName: 'a', showWhenGrouped: false }];
        const tree = mount((
          <PluginHost>
            {pluginDepsToComponents(defaultDeps)}
            <GridExporterCore
              {...defaultProps}
              grouping={grouping}
              groupColumnExtensions={groupColumnExtensions}
              showColumnsWhenGrouped={true}
            />
          </PluginHost>
        ));

        expect(tree.find(GroupingState).props())
          .toMatchObject({
            grouping,
          });
        expect(tree.find(TableColumnsWithGrouping).props())
          .toMatchObject({
            columnExtensions: groupColumnExtensions,
            showColumnsWhenGrouped: true,
          });
        expect(tree.find(IntegratedGrouping).exists())
          .toBeTruthy();
      });

      it('should not render grouping plugins if grouping is not provided', () => {
        const tree = mount((
          <PluginHost>
            {pluginDepsToComponents(defaultDeps)}
            <GridExporterCore {...defaultProps} />
          </PluginHost>
        ));

        expect(tree.find(GroupingState).exists())
          .toBeFalsy();
        expect(tree.find(TableColumnsWithGrouping).exists())
          .toBeFalsy();
        expect(tree.find(IntegratedGrouping).exists())
          .toBeFalsy();
      });
    });

    describe('summary', () => {
      it('should not render summary plugins if summary is not provided', () => {
        const tree = mount((
          <PluginHost>
            {pluginDepsToComponents(defaultDeps)}
            <GridExporterCore {...defaultProps} />
          </PluginHost>
        ));

        expect(tree.find(SummaryState).exists())
          .toBeFalsy();
        expect(tree.find(IntegratedSummary).exists())
          .toBeFalsy();
      });

      it('should render summary plugins if summary items are provided', () => {
        const totalItems = [{ columnName: 'a', type: 'max' }];
        const groupItems = [{ columnName: 'b', type: 'min' }];
        const tree = mount((
          <PluginHost>
            {pluginDepsToComponents(defaultDeps)}
            <GridExporterCore
              {...defaultProps}
              totalSummaryItems={totalItems}
              groupSummaryItems={groupItems}
            />
          </PluginHost>
        ));

        expect(tree.find(SummaryState).props())
          .toMatchObject({
            totalItems,
            groupItems,
          });
        expect(tree.find(IntegratedSummary).exists())
          .toBeTruthy();
      });
    });

    describe('selection', () => {
      it('should not render SelectionState if selection is not provided', () => {
        const tree = mount((
          <PluginHost>
            {pluginDepsToComponents(defaultDeps)}
            <GridExporterCore {...defaultProps} exportSelected />
          </PluginHost>
        ));

        expect(tree.find(SelectionState).exists())
          .toBeFalsy();
      });

      it('should not render SelectionState if exportSelected is false', () => {
        const selection = ['1', '2'];
        const tree = mount((
          <PluginHost>
            {pluginDepsToComponents(defaultDeps)}
            <GridExporterCore {...defaultProps} selection={selection} />
          </PluginHost>
        ));

        expect(tree.find(SelectionState).exists())
          .toBeFalsy();
      });

      it('should render SelectionState if selection is provided', () => {
        const selection = ['1', '2'];
        const tree = mount((
          <PluginHost>
            {pluginDepsToComponents(defaultDeps)}
            <GridExporterCore
              {...defaultProps}
              selection={selection}
              exportSelected
            />
          </PluginHost>
        ));

        expect(tree.find(SelectionState).props())
          .toMatchObject({ selection });
      });
    });

    describe('filtering', () => {
      it('should render filtering plugins if filters are provided', () => {
        const filters = [{ columnName: 'a', value: 1 }];
        const tree = mount((
          <PluginHost>
            {pluginDepsToComponents(defaultDeps)}
            <GridExporterCore
              {...defaultProps}
              filters={filters}
            />
          </PluginHost>
        ));

        expect(tree.find(FilteringState).props())
          .toMatchObject({
            filters,
          });
        expect(tree.find(IntegratedFiltering).exists())
          .toBeTruthy();
      });

      it('should not render filtering plugins if filters are not provided', () => {
        const tree = mount((
          <PluginHost>
            {pluginDepsToComponents(defaultDeps)}
            <GridExporterCore {...defaultProps} />
          </PluginHost>
        ));

        expect(tree.find(FilteringState).exists())
          .toBeFalsy();
        expect(tree.find(IntegratedFiltering).exists())
          .toBeFalsy();
      });
    });

    describe('sorting', () => {
      it('should render sorting plugins if sorting is provided', () => {
        const sorting = [{ columnName: 'a', direction: 'asc' }];
        const tree = mount((
          <PluginHost>
            {pluginDepsToComponents(defaultDeps)}
            <GridExporterCore
              {...defaultProps}
              sorting={sorting}
            />
          </PluginHost>
        ));

        expect(tree.find(SortingState).props())
          .toMatchObject({
            sorting,
          });
        expect(tree.find(IntegratedSorting).exists())
          .toBeTruthy();
      });

      it('should not render sorting plugins if sorting is not provided', () => {
        const tree = mount((
          <PluginHost>
            {pluginDepsToComponents(defaultDeps)}
            <GridExporterCore {...defaultProps} />
          </PluginHost>
        ));

        expect(tree.find(SortingState).exists())
          .toBeFalsy();
        expect(tree.find(IntegratedSorting).exists())
          .toBeFalsy();
      });
    });

    describe('column visibility', () => {
      it('should render column visibility plugin if hiddenColumnNames is provided', () => {
        const hiddenColumnNames = ['a'];
        const tree = mount((
          <PluginHost>
            {pluginDepsToComponents(defaultDeps)}
            <GridExporterCore
              {...defaultProps}
              hiddenColumnNames={hiddenColumnNames}
            />
          </PluginHost>
        ));

        expect(tree.find(VisibleTableColumns).props())
          .toMatchObject({
            hiddenColumnNames,
          });
      });

      it('should not render column visibility plugin if hiddenColumnNames not provided', () => {
        const tree = mount((
          <PluginHost>
            {pluginDepsToComponents(defaultDeps)}
            <GridExporterCore {...defaultProps} />
          </PluginHost>
        ));

        expect(tree.find(VisibleTableColumns).exists())
          .toBeFalsy();
      });
    });

    describe('column order', () => {
      it('should render column order plugin if order is provided', () => {
        const columnOrder = ['a', 'b'];
        const tree = mount((
          <PluginHost>
            {pluginDepsToComponents(defaultDeps)}
            <GridExporterCore
              {...defaultProps}
              columnOrder={columnOrder}
            />
          </PluginHost>
        ));

        expect(tree.find(OrderedTableColumns).props())
          .toMatchObject({
            order: columnOrder,
          });
      });

      it('should not render column order plugins if order is not provided', () => {
        const tree = mount((
          <PluginHost>
            {pluginDepsToComponents(defaultDeps)}
            <GridExporterCore {...defaultProps} />
          </PluginHost>
        ));

        expect(tree.find(OrderedTableColumns).exists())
          .toBeFalsy();
      });
    });
  });
});
