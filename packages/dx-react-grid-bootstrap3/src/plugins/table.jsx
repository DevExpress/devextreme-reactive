import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Table as TableBase } from '@devexpress/dx-react-grid';
import { TableLayout } from '../templates/table-layout';
import { TableCell } from '../templates/table-cell';
import { TableStubCell } from '../templates/table-stub-cell';
import { TableStubHeaderCell } from '../templates/table-stub-header-cell';
import { TableNoDataCell } from '../templates/table-no-data-cell';
import { TableRow } from '../templates/table-row';
import { Table as TableComponent } from '../templates/table';
import { TableContainer } from '../templates/table-container';

const TableHead = props => <thead {...props} />;
const TableBody = props => <tbody {...props} />;

const defaultMessages = {
  noData: 'No data',
};

export class Table extends React.PureComponent {
  render() {
    const {
      messages,
      ...restProps
    } = this.props;

    return (
      <TableBase
        tableComponent={TableComponent}
        headComponent={TableHead}
        bodyComponent={TableBody}
        containerComponent={TableContainer}
        layoutComponent={TableLayout}
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

Table.Cell = TableCell;
Table.Row = TableRow;
Table.NoDataCell = TableNoDataCell;
Table.NoDataRow = TableRow;
Table.StubCell = TableStubCell;
Table.StubHeaderCell = TableStubCell;
Table.Table = TableComponent;
Table.TableHead = TableHead;
Table.TableBody = TableBody;
Table.Container = TableContainer;

Table.propTypes = {
  messages: PropTypes.shape({
    noData: PropTypes.string,
  }),
};

Table.defaultProps = {
  messages: {},
};
