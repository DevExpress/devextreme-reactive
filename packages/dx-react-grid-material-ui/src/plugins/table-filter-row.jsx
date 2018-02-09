import * as React from 'react';
import * as PropTypes from 'prop-types';
import { TableFilterRow as TableFilterRowBase } from '@devexpress/dx-react-grid';
import { TableFilterCell } from '../templates/table-filter-cell';
import { TableRow } from '../templates/table-row';

const defaultMessages = {
  filterPlaceholder: 'Filter...',
};

export class TableFilterRow extends React.PureComponent {
  render() {
    const {
      messages, ...restProps
    } = this.props;

    return (
      <TableFilterRowBase
        cellComponent={TableFilterCell}
        rowComponent={TableRow}
        messages={{ ...defaultMessages, ...messages }}
        {...restProps}
      />
    );
  }
}

TableFilterRow.Cell = TableFilterCell;
TableFilterRow.Row = TableRow;

TableFilterRow.propTypes = {
  messages: PropTypes.shape({
    filterPlaceholder: PropTypes.string,
  }),
};

TableFilterRow.defaultProps = {
  messages: {},
};
