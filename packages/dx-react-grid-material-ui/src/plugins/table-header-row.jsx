import React from 'react';
import PropTypes from 'prop-types';
import { TableHeaderRow as TableHeaderRowBase } from '@devexpress/dx-react-grid';
import { TableHeaderCell } from '../templates/table-header-cell';
import { TableRow } from '../templates/table-row';

const defaultMessages = {
  sortingHint: 'Sort',
};

export class TableHeaderRow extends React.PureComponent {
  render() {
    const {
      messages,
      ...restProps
    } = this.props;

    return (
      <TableHeaderRowBase
        cellComponent={TableHeaderCell}
        rowComponent={TableRow}
        messages={{ ...defaultMessages, ...messages }}
        {...restProps}
      />
    );
  }
}

TableHeaderRow.Cell = TableHeaderCell;
TableHeaderRow.Row = TableRow;

TableHeaderRow.propTypes = {
  messages: PropTypes.shape({
    sortingHint: PropTypes.string,
  }),
};

TableHeaderRow.defaultProps = {
  messages: {},
};
