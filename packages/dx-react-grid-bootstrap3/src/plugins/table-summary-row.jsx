import * as React from 'react';
import * as PropTypes from 'prop-types';

import { TableSummaryRow as TableSummaryRowBase } from '@devexpress/dx-react-grid';
import { TableCell } from '../templates/table-cell';

const defaultMessages = {
  sum: 'Total',
  min: 'Min',
  max: 'Max',
  avg: 'Avg',
  count: 'Count',
};

export class TableSummaryRow extends React.PureComponent {
  render() {
    const {
      messages, ...restProps
    } = this.props;

    return (
      <TableSummaryRowBase
        cellComponent={TableCell}
        messages={{ ...defaultMessages, ...messages }}
        {...restProps}
      />
    );
  }
}

TableSummaryRow.propTypes = {
  messages: PropTypes.shape({
    sum: PropTypes.string,
    min: PropTypes.string,
    max: PropTypes.string,
    avg: PropTypes.string,
    count: PropTypes.string,
  }),
};

TableSummaryRow.defaultProps = {
  messages: {},
};

TableSummaryRow.Cell = TableCell;
