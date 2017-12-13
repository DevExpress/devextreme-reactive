import React from 'react';
import PropTypes from 'prop-types';
import { createRenderComponent } from '@devexpress/dx-react-core';
import { Table as TableBase } from '@devexpress/dx-react-grid';
import { VirtualTableLayout } from '../templates/virtual-table-layout';
import { TableCell } from '../templates/table-cell';
import { TableRow } from '../templates/table-row';
import { TableNoDataCell } from '../templates/table-no-data-cell';
import { TableStubCell } from '../templates/table-stub-cell';
import { TableStubHeaderCell } from '../templates/table-stub-header-cell';

const defaultMessages = {
  noData: 'No data',
};

export class VirtualTable extends React.PureComponent {
  constructor(props) {
    super(props);

    this.layoutRenderComponent = createRenderComponent();
  }
  render() {
    const {
      height,
      estimatedRowHeight,
      messages,
      ...restProps
    } = this.props;

    return (
      <TableBase
        layoutComponent={this.layoutRenderComponent(props => (
          <VirtualTableLayout
            {...props}
            height={height}
            estimatedRowHeight={estimatedRowHeight}
          />
        ))}
        rowComponent={TableRow}
        cellComponent={TableCell}
        noDataRowComponent={TableRow}
        noDataCellComponent={TableNoDataCell}
        stubCellComponent={TableStubCell}
        stubHeaderCellComponent={TableStubHeaderCell}
        messages={{ ...defaultMessages, ...messages }}
        {...restProps}
      />
    );
  }
}

VirtualTable.Cell = TableCell;
VirtualTable.Row = TableRow;
VirtualTable.NoDataCell = TableNoDataCell;
VirtualTable.NoDataRow = TableRow;
VirtualTable.StubCell = TableStubCell;
VirtualTable.StubHeaderCell = TableStubCell;

VirtualTable.propTypes = {
  estimatedRowHeight: PropTypes.number,
  height: PropTypes.number,
  messages: PropTypes.shape({
    noData: PropTypes.string,
  }),
};

VirtualTable.defaultProps = {
  estimatedRowHeight: 37,
  height: 530,
  messages: {},
};
