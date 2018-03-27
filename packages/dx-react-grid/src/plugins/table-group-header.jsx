import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Getter, Template, Plugin, TemplateConnector, TemplatePlaceholder } from '@devexpress/dx-react-core';
import {
  isBandedTableRow,
  isBandedOrHeaderRow,
  tableRowsWithBands,
  isHeadingTableCell,
  getBandComponent,
} from '@devexpress/dx-grid-core';

const CellPlaceholder = props => <TemplatePlaceholder params={props} />;

export class TableBandHeader extends React.PureComponent {
  render() {
    const {
      cellComponent: Cell,
      rowComponent: Row,
      bandedHeaderCellComponent: HeaderCell,
      emptyCellComponent: EmptyCell,
      columnBands,
    } = this.props;

    const tableHeaderRowsComputed = ({ tableHeaderRows, tableColumns }) =>
      tableRowsWithBands(tableHeaderRows, columnBands, tableColumns);

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
              {({ tableColumns, tableHeaderRows }) => {
                const bandComponent =
                  getBandComponent(params, tableHeaderRows, tableColumns, columnBands);

                switch (bandComponent.type) {
                  case 'duplicateRender':
                    return <TemplatePlaceholder />;
                  case 'emptyCell':
                    return <EmptyCell />;
                  case 'groupCell':
                    return <Cell {...params} {...bandComponent.payload} />;
                  case 'headerCell':
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
  emptyCellComponent: PropTypes.func.isRequired,
};
