import * as React from 'react';
import {
  Getter, Template, Plugin,
  TemplateConnector, TemplatePlaceholder, Getters, PluginComponents,
} from '@devexpress/dx-react-core';
import {
  getBandComponent, tableHeaderColumnChainsWithBands,
  isBandedTableRow, isBandedOrHeaderRow,
  tableRowsWithBands, isHeadingTableCell,
  BAND_GROUP_CELL, BAND_HEADER_CELL,
  BAND_EMPTY_CELL, BAND_DUPLICATE_RENDER,
  TABLE_BAND_TYPE,
} from '@devexpress/dx-grid-core';
import { TableBandHeaderProps, TableCellProps, TableRowProps } from '../types';

const CellPlaceholder = (props: TableCellProps) => <TemplatePlaceholder params={props} />;

class TableBandHeaderBase extends React.PureComponent<TableBandHeaderProps> {
  static ROW_TYPE = TABLE_BAND_TYPE;
  static components: PluginComponents;

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
        <Getter name="tableHeaderColumnChains" computed={tableHeaderColumnChainsComputed} />

        <Template
          name="tableCell"
          predicate={({ tableRow }: any) => !!isBandedOrHeaderRow(tableRow)}
        >
          {(params: TableCellProps) => (
            <TemplateConnector>
              {({
                tableColumns,
                tableHeaderRows,
                tableHeaderColumnChains,
              }) => {
                const bandComponent = getBandComponent(
                  params,
                  tableHeaderRows, tableColumns,
                  columnBands, tableHeaderColumnChains,
                );
                switch (bandComponent.type) {
                  case BAND_DUPLICATE_RENDER:
                    return <TemplatePlaceholder />;
                  case BAND_EMPTY_CELL:
                    return <InvisibleCell />;
                  case BAND_GROUP_CELL: {
                    const { value, ...payload } = bandComponent.payload!;
                    return (
                      <Cell {...params} {...payload}>
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
          {(params: TableCellProps) => <HeaderCell component={CellPlaceholder} {...params} />}
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

export const TableBandHeader: React.ComponentType<TableBandHeaderProps> = TableBandHeaderBase;
