import * as React from 'react';
import { mount } from 'enzyme';
import { pluginDepsToComponents, getComputedState, setupConsole } from '@devexpress/dx-testing';
import { PluginHost } from '@devexpress/dx-react-core';
import {
  closeGroupGetter,
  rowsToExport,
  groupTree,
  outlineLevels,
  exportSummaryGetter,
  createWorkbook,
  createWorksheet,
  maxGroupLevel,
} from '@devexpress/dx-grid-core';
import { GridExporterCore } from './grid-exporter-core';
import { GridCoreGetters, TableColumnsWithDataRowsGetter, TableColumnsWithGrouping } from './internal';
import { GroupingState } from './grouping-state';
import { IntegratedGrouping } from './integrated-grouping';
import { SummaryState } from './summary-state';
import { IntegratedSummary } from './integrated-summary';
import { SelectionState } from './selection-state';
import { defaultSummaryMessages } from '../components/summary/table-summary-content';

jest.mock('./internal', () => ({
  GridCoreGetters: () => null,
  TableColumnsWithGrouping: () => null,
  TableColumnsWithDataRowsGetter: () => null,
}));

jest.mock('@devexpress/dx-grid-core', () => ({
  getColumnExtensionValueGetter: jest.fn(),
  groupedRows: jest.fn(),
  expandedGroupRows: jest.fn(),
  groupCollapsedRowsGetter: jest.fn(),
  rowsToExport: jest.fn(),
  outlineLevels: jest.fn(),
  groupTree: jest.fn(),
  maxGroupLevel: jest.fn(),
  closeGroupGetter: jest.fn(),
  closeSheet: jest.fn(),
  exportHeader: jest.fn(),
  exportRows: jest.fn(),
  exportSummaryGetter: jest.fn(),
  prepareGroupSummaryItems: jest.fn(),
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
    finishExport: () => {},
  },
};

describe('GridExporter', () => {
  beforeEach(() => {
    rowsToExport.mockReturnValue('rowsToExport');
    groupTree.mockReturnValue('groupTree');
    outlineLevels.mockReturnValue('outlineLevels');
    maxGroupLevel.mockReturnValue('maxGroupLevel');
    exportSummaryGetter.mockReturnValue('exportSummaryGetter');
    createWorkbook.mockReturnValue('workbook');
    createWorksheet.mockReturnValue('worksheet');
    closeGroupGetter.mockReturnValue('closeGroupGetter');
  });

  afterEach(jest.clearAllMocks);

  it('should render only when export initiated', () => {
    
  });

  describe('getters', () => {
    expect.extend({
      toBeRendered(plugin, tree) {
        const name = Object.keys(plugin)[0];
        const pass = tree.find(plugin[name]).exists();

        return {
          pass,
          message: () => `plugin ${name} should be rendered`,
        };
      },
      toHaveProps(plugin, tree, props) {
        const name = Object.keys(plugin)[0];
        if (!props) return { pass: true };

        // const actualProps = tree.find(plugin[name]).props();
        // const pass = Object.keys(props).reduce((acc, propName) => (
        //   acc && this.equals(props[propName], actualProps[propName])
        // ), true);

        expect(tree.find(plugin[name]).props())
          .toMatchObject(props);

        return {
          pass: !this.isNot,
          message: () => 'props do not match',
        };
      },
    });

    const assertPluginsRendered = (featureName, { featureProps, plugins }) => {
      it(`should not render ${featureName} plugins if props aren't provided`, () => {
        const tree = mount((
          <PluginHost>
            {pluginDepsToComponents(defaultDeps)}
            <GridExporterCore {...defaultProps} />
          </PluginHost>
        ));

        startExport(tree);

        plugins.forEach(({ plugin }) => {
          expect(plugin).not.toBeRendered(tree);
        });
      });

      it(`should render ${featureName} plugins if props provided`, () => {
        const tree = mount((
          <PluginHost>
            {pluginDepsToComponents(defaultDeps)}
            <GridExporterCore {...defaultProps} {...featureProps} />
          </PluginHost>
        ));

        startExport(tree);

        plugins.forEach(({ plugin, props }) => {
          expect(plugin).toBeRendered(tree);
          expect(plugin).toHaveProps(tree, props);
        });

        // plugins.forEach(({ plugin, props }) => {
        //   expect(tree.find(plugin).exists())
        //     .toBeTruthy();

        //   if (props) {
        //     expect(tree.find(plugin).props())
        //       .toMatchObject(props);
        //   }
        // })
      })
    }
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
            <GridExporterCore {...defaultProps} />
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
            <GridExporterCore {...defaultProps} selection={selection} />
          </PluginHost>
        ));

        expect(tree.find(SelectionState).props())
          .toMatchObject({ selection });
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

    const assertGetter = (name, result, computed, deps, extraProps = {}) => {
      it(`should provide ${name}`, () => {
        const tree = mount((
          <PluginHost>
            {pluginDepsToComponents(defaultDeps)}
            <GridExporterCore {...defaultProps} {...extraProps} />
            {pluginDepsToComponents({})}
          </PluginHost>
        ));
  
        expect(getComputedState(tree)[name])
          .toBe(result);

        if (computed) {
          expect(computed)
            .toHaveBeenCalledWith(...deps);
        }
      });
    }

    // assertGetter(
    //   'maxGroupLevel',
    //   'maxGroupLevel',
    //   maxGroupLevel,
    //   [defaultDeps.getter.grouping],
    // );

    it('should provide maxGroupLevel', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <GridExporterCore {...defaultProps} />
          {pluginDepsToComponents({})}
        </PluginHost>
      ));

      expect(getComputedState(tree).maxGroupLevel)
        .toBe('maxGroupLevel');
      expect(maxGroupLevel)
        .toHaveBeenCalledWith(
          defaultDeps.getter.grouping,
        );
    });

    it('should provide outlineLevels', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <GridExporterCore {...defaultProps} />
          {pluginDepsToComponents({})}
        </PluginHost>
      ));

      expect(getComputedState(tree).outlineLevels)
        .toBe('outlineLevels');
      expect(outlineLevels)
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
          <GridExporterCore {...defaultProps} selection={selection} />
          {pluginDepsToComponents({})}
        </PluginHost>
      ));

      expect(getComputedState(tree).rows)
        .toBe('rowsToExport');
      expect(rowsToExport)
        .toHaveBeenCalledWith(
          defaultDeps.getter.rows,
          selection,
          defaultDeps.getter.getCollapsedRows,
          defaultDeps.getter.getRowId,
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
        .toBe('groupTree');
      expect(groupTree)
        .toHaveBeenCalledWith(
          'rowsToExport',
          'outlineLevels',
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
          'groupTree',
          'outlineLevels',
          'maxGroupLevel',
          defaultDeps.getter.groupSummaryItems,
          'exportSummaryGetter'
        );
    });

  });
});
