import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Getter, Template, Plugin,
  TemplateConnector, TemplatePlaceholder,
} from '@devexpress/dx-react-core';
import {
  getBandComponent,
  isBandedTableRow, isBandedOrHeaderRow,
  tableRowsWithBands, isHeadingTableCell,
  BAND_GROUP_CELL, BAND_HEADER_CELL,
  BAND_EMPTY_CELL, BAND_DUPLICATE_RENDER,
} from '@devexpress/dx-grid-core';

const CellPlaceholder = props => <TemplatePlaceholder params={props} />;

export class TableBandHeader extends React.PureComponent {
  render() {
    const {
      cellComponent: Cell,
      rowComponent: Row,
      bandedHeaderCellComponent: HeaderCell,
      invisibleCellComponent: InvisibleCell,
      columnBands,
    } = this.props;

    const tableHeaderRowsComputed = ({ tableHeaderRows, tableColumns }) => tableRowsWithBands(
      tableHeaderRows, columnBands, tableColumns,
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

        <Template
          name="tableCell"
          predicate={({ tableRow }) => isBandedOrHeaderRow(tableRow)}
        >
          {params => (
            <TemplateConnector>
              {({
                tableColumns,
                tableHeaderRows,
              }) => {
                const bandComponent = getBandComponent(
                  params,
                  tableHeaderRows, tableColumns,
                  columnBands,
                );
                switch (bandComponent.type) {
                  case BAND_DUPLICATE_RENDER:
                    return <TemplatePlaceholder />;
                  case BAND_EMPTY_CELL:
                    return <InvisibleCell />;
                  case BAND_GROUP_CELL: {
                    const { value, ...payload } = bandComponent.payload;
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
          predicate={({ tableRow, tableColumn }) => isHeadingTableCell(tableRow, tableColumn)}
        >
          {params => <HeaderCell component={CellPlaceholder} {...params} />}
        </Template>
        <Template
          name="tableRow"
          predicate={({ tableRow }) => isBandedTableRow(tableRow)}
        >
          {params => <Row {...params} />}
        </Template>
      </Plugin>
    );
  }
}

TableBandHeader.propTypes = {
  columnBands: PropTypes.array.isRequired,
  cellComponent: PropTypes.func.isRequired,
  rowComponent: PropTypes.func.isRequired,
  bandedHeaderCellComponent: PropTypes.func.isRequired,
  invisibleCellComponent: PropTypes.func.isRequired,
};

TableBandHeader.components = {
  cellComponent: 'Cell',
  rowComponent: 'Row',
  bandedHeaderCellComponent: 'BandedHeaderCell',
  invisibleCellComponent: 'InvisibleCell',
};
