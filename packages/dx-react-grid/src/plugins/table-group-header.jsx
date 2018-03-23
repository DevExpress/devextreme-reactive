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

export class TableGroupHeader extends React.PureComponent {
  render() {
    const {
      cellComponent: Cell,
      rowComponent: HeaderRow,
      headerCellComponent: HeaderCell,
      stubCellComponent: StubCell,
      emptyCellComponent: EmptyCell,
      columnGroups,
    } = this.props;

    const tableHeaderRowsComputed = ({ tableHeaderRows }) =>
      tableRowsWithBands(tableHeaderRows, columnGroups);

    return (
      <Plugin
        name="TableGroupHeader"
        dependencies={[
          { name: 'Table' },
          { name: 'TableHeaderRow' },
          { name: 'DragDropProvider', optional: true },
          { name: 'TableColumnResizing', optional: true },
          { name: 'TableSelection', optional: true },
          { name: 'TableEditColumn', optional: true },
        ]}
      >
        <Getter name="tableHeaderRows" computed={tableHeaderRowsComputed} />

        <Template
          name="tableCell"
          predicate={({ tableRow, tableColumn }) => tableRow.type === 'heading' && tableColumn.type === 'flex'}
        >
          {params => <StubCell style={{ ...params.style }} rowSpan={params.rowSpan} />}
        </Template>

        <Template
          name="tableCell"
          predicate={({ tableRow }) => isBandedOrHeaderRow(tableRow)}
        >
          {params => (
            <TemplateConnector>
              {({ tableColumns, tableHeaderRows }) => {
                const bandComponent =
                  getBandComponent(params, tableHeaderRows, tableColumns, columnGroups);

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
          {params => <HeaderRow {...params} />}
        </Template>
      </Plugin>
    );
  }
}

TableGroupHeader.propTypes = {
  columnGroups: PropTypes.array.isRequired,
  cellComponent: PropTypes.func.isRequired,
  rowComponent: PropTypes.func.isRequired,
  headerCellComponent: PropTypes.func.isRequired,
  stubCellComponent: PropTypes.func.isRequired,
  emptyCellComponent: PropTypes.func.isRequired,
};

TableGroupHeader.defaultProps = {
  showSortingControls: false,
  showGroupingControls: false,
};
