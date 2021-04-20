import * as React from 'react';
import {
  Getter, Template, Plugin,
  TemplateConnector, TemplatePlaceholder, Getters,
} from '@devexpress/dx-react-core';
import {
  getBandComponent, tableHeaderColumnChainsWithBands,
  isBandedTableRow, isBandedOrHeaderRow,
  tableRowsWithBands, isHeadingTableCell,
  BAND_GROUP_CELL, BAND_HEADER_CELL,
  BAND_EMPTY_CELL, BAND_DUPLICATE_RENDER,
  TABLE_BAND_TYPE,
  BAND_FILL_LEVEL_CELL,
  bandLevelsVisibility,
  columnBandLevels,
  columnVisibleIntervals,
} from '@devexpress/dx-grid-core';
import { TableBandHeaderProps, TableBandHeader as BandHeaderNS, TableRowProps } from '../types';

const CellPlaceholder = (props: BandHeaderNS.CellProps) => <TemplatePlaceholder params={props} />;

const bandLevelsVisibilityComputed = (
  { columnVisibleIntervals: columnIntervals, tableHeaderColumnChains, bandLevels }: Getters,
) => bandLevelsVisibility(
  columnIntervals, tableHeaderColumnChains, bandLevels,
);

const columnVisibleIntervalsComputed = (
  { viewport, tableColumns }: Getters,
) => columnVisibleIntervals(viewport, tableColumns);

class TableBandHeaderBase extends React.PureComponent<TableBandHeaderProps> {
  static ROW_TYPE = TABLE_BAND_TYPE;
  static components = {
    cellComponent: 'Cell',
    rowComponent: 'Row',
    bandedHeaderCellComponent: 'BandedHeaderCell',
    invisibleCellComponent: 'InvisibleCell',
  };

  render() {
    const {
      cellComponent: Cell,
      rowComponent: Row,
      bandedHeaderCellComponent: HeaderCell,
      invisibleCellComponent: InvisibleCell,
      columnBands,
    } = this.props;

    const tableHeaderRowsComputed = (
      { tableHeaderRows, tableColumns }: Getters,
    ) => tableRowsWithBands(
      tableHeaderRows, columnBands, tableColumns,
    );
    const tableHeaderColumnChainsComputed = (
      { tableHeaderRows, tableColumns }: Getters,
    ) => tableHeaderColumnChainsWithBands(
      tableHeaderRows, tableColumns, columnBands,
    );
    const bandLevels = columnBandLevels(columnBands);

    return (
      <Plugin
        name="TableBandHeader"
        dependencies={[
          { name: 'Table' },
          { name: 'TableHeaderRow' },
          { name: 'TableSelection', optional: true },
          { name: 'TableEditColumn', optional: true },
        ]}
      >
        <Getter name="tableHeaderRows" computed={tableHeaderRowsComputed} />
        {/* internal */}
        <Getter name="columnVisibleIntervals" computed={columnVisibleIntervalsComputed} />
        <Getter name="tableHeaderColumnChains" computed={tableHeaderColumnChainsComputed} />
        <Getter name="bandLevels" value={bandLevels} />
        <Getter name="bandLevelsVisibility" computed={bandLevelsVisibilityComputed} />

        <Template
          name="tableCell"
          predicate={({ tableRow }: any) => !!isBandedOrHeaderRow(tableRow)}
        >
          {(params: BandHeaderNS.CellProps) => (
            <TemplateConnector>
              {({
                tableColumns,
                tableHeaderRows,
                tableHeaderColumnChains,
                columnVisibleIntervals: columnIntervals, 
                bandLevelsVisibility: levelsVisibility,
                setRefKeyboardNavigation,
              }) => {
                const bandComponent = getBandComponent(
                  params,
                  tableHeaderRows, tableColumns,
                  columnBands, tableHeaderColumnChains, columnIntervals,
                  levelsVisibility,
                );
                switch (bandComponent.type) {
                  case BAND_DUPLICATE_RENDER:
                    return <TemplatePlaceholder params={{ ...params }} />;

                  case BAND_EMPTY_CELL:
                    return <InvisibleCell />;

                  case BAND_GROUP_CELL: {
                    const { value, ...payload } = bandComponent.payload!;
                    return (
                      <Cell {...params} {...payload} tabIndex={-1} setRefKeyboardNavigation={setRefKeyboardNavigation}>
                        {value}
                      </Cell>
                    );
                  }

                  case BAND_HEADER_CELL:
                    return (
                      <TemplatePlaceholder
                        name="tableCell"
                        params={{ ...params, ...bandComponent.payload }}
                      />
                    );

                  case BAND_FILL_LEVEL_CELL:
                    return (
                      <Cell
                        {...params}
                        {...bandComponent.payload}
                        style={{ whiteSpace: 'pre' }}
                      >
                        {' '}
                      </Cell>
                    );
                  default:
                    return null;
                }
              }}
            </TemplateConnector>
          )}
        </Template>
        <Template
          name="tableCell"
          predicate={({ tableRow, tableColumn }: any) => isHeadingTableCell(tableRow, tableColumn)}
        >
          {(params: BandHeaderNS.CellProps) => (
            <HeaderCell component={CellPlaceholder} {...params} />
          )}
        </Template>
        <Template
          name="tableRow"
          predicate={({ tableRow }: any) => !!isBandedTableRow(tableRow)}
        >
          {(params: TableRowProps) => <Row {...params} />}
        </Template>
      </Plugin>
    );
  }
}

TableBandHeaderBase.components = {
  cellComponent: 'Cell',
  rowComponent: 'Row',
  bandedHeaderCellComponent: 'BandedHeaderCell',
  invisibleCellComponent: 'InvisibleCell',
};

/** A plugin that renders the banded cells. */
export const TableBandHeader: React.ComponentType<TableBandHeaderProps> & {
  /** The band row type's identifier. */
  ROW_TYPE: symbol;
} = TableBandHeaderBase;
