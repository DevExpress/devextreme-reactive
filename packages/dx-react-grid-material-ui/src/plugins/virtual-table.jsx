import * as React from 'react';
import * as PropTypes from 'prop-types';
import { createRenderComponent } from '@devexpress/dx-react-core';
import { Table as TableBase } from '@devexpress/dx-react-grid';
import { TableBody, TableHead } from 'material-ui/Table';
import { Table } from '../templates/table';
import { VirtualTableLayout } from '../templates/virtual-table-layout';
import { TableRow } from '../templates/table-row';
import { TableCell } from '../templates/table-cell';
import { TableStubCell } from '../templates/table-stub-cell';
import { TableNoDataCell } from '../templates/table-no-data-cell';
import { TableContainer } from '../templates/table-container';

const FixedHeader = props => <Table use="head" {...props} />;

const defaultMessages = {
  noData: 'No data',
};

export class VirtualTable extends React.PureComponent {
  constructor(props) {
    super(props);

    const { height, estimatedRowHeight } = props;
    this.layoutRenderComponent =
      createRenderComponent(VirtualTableLayout, { height, estimatedRowHeight });
  }
  componentWillReceiveProps({ height, estimatedRowHeight }) {
    this.layoutRenderComponent.update({ height, estimatedRowHeight });
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
        layoutComponent={this.layoutRenderComponent.component}
        bodyComponent={TableBody}
        headComponent={TableHead}
        tableComponent={Table}
        fixedHeaderComponent={FixedHeader}
        containerComponent={TableContainer}
        rowComponent={TableRow}
        cellComponent={TableCell}
        noDataRowComponent={TableRow}
        noDataCellComponent={TableNoDataCell}
        stubCellComponent={TableStubCell}
        stubHeaderCellComponent={TableStubCell}
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
VirtualTable.Table = Table;
VirtualTable.TableHead = TableHead;
VirtualTable.TableBody = TableBody;
VirtualTable.FixedHeader = FixedHeader;
VirtualTable.Container = TableContainer;

VirtualTable.propTypes = {
  estimatedRowHeight: PropTypes.number,
  height: PropTypes.number,
  messages: PropTypes.shape({
    noData: PropTypes.string,
  }),
};

VirtualTable.defaultProps = {
  estimatedRowHeight: 48,
  height: 530,
  messages: {},
};
