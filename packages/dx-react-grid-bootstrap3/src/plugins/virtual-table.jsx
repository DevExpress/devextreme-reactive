import * as React from 'react';
import * as PropTypes from 'prop-types';
import { createRenderComponent } from '@devexpress/dx-react-core';
import { Table as TableBase } from '@devexpress/dx-react-grid';
import { Table as TableComponent } from '../templates/table';
import { VirtualTableLayout } from '../templates/virtual-table-layout';
import { TableCell } from '../templates/table-cell';
import { TableRow } from '../templates/table-row';
import { TableNoDataCell } from '../templates/table-no-data-cell';
import { TableStubCell } from '../templates/table-stub-cell';
import { TableStubHeaderCell } from '../templates/table-stub-header-cell';
import { TableContainer } from '../templates/table-container';
import { TableStubRow } from '../templates/table-stub-row';

const FixedHeader = props => <TableComponent use="head" {...props} />;
const FixedFooter = props => <TableComponent use="foot" {...props} />;
const TableHead = props => <thead {...props} />;
const TableBody = props => <tbody {...props} />;
const TableFooter = props => <tfoot {...props} />;

const defaultMessages = {
  noData: 'No data',
};

export class VirtualTable extends React.PureComponent {
  constructor(props) {
    super(props);

    const {
      height,
      estimatedRowHeight,
      headTableComponent,
      footerTableComponent,
    } = props;

    this.layoutRenderComponent = createRenderComponent(VirtualTableLayout, {
      height,
      estimatedRowHeight,
      headTableComponent,
      footerTableComponent,
    });
  }

  componentWillReceiveProps({
    height,
    estimatedRowHeight,
    headTableComponent,
    footerTableComponent,
  }) {
    this.layoutRenderComponent.update({
      height,
      estimatedRowHeight,
      headTableComponent,
      footerTableComponent,
    });
  }

  render() {
    const {
      height,
      estimatedRowHeight,
      headTableComponent,
      messages,
      ...restProps
    } = this.props;

    return (
      <TableBase
        layoutComponent={this.layoutRenderComponent.component}
        tableComponent={TableComponent}
        headComponent={TableHead}
        bodyComponent={TableBody}
        footerComponent={TableFooter}
        containerComponent={TableContainer}
        rowComponent={TableRow}
        cellComponent={TableCell}
        noDataRowComponent={TableRow}
        noDataCellComponent={TableNoDataCell}
        stubRowComponent={TableStubRow}
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
VirtualTable.StubRow = TableStubRow;
VirtualTable.StubCell = TableStubCell;
VirtualTable.StubHeaderCell = TableStubCell;
VirtualTable.Table = TableComponent;
VirtualTable.TableHead = TableHead;
VirtualTable.TableBody = TableBody;
VirtualTable.TableFooter = TableFooter;
VirtualTable.FixedHeader = FixedHeader;
VirtualTable.Container = TableContainer;

VirtualTable.propTypes = {
  estimatedRowHeight: PropTypes.number,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['auto'])]),
  headTableComponent: PropTypes.func,
  footerTableComponent: PropTypes.func,
  messages: PropTypes.shape({
    noData: PropTypes.string,
  }),
};

VirtualTable.defaultProps = {
  estimatedRowHeight: 37,
  height: 530,
  headTableComponent: FixedHeader,
  footerTableComponent: FixedFooter,
  messages: {},
};
