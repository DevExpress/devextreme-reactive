import React from 'react';
import PropTypes from 'prop-types';
import { combineTemplates } from '@devexpress/dx-react-core';
import { TableFilterRow as TableFilterRowBase } from '@devexpress/dx-react-grid';
import { TableFilterCell } from '../templates/table-filter-cell';
import { TableRow } from '../templates/table-row';

const defaultGetCellComponent = () => TableFilterCell;

const defaultMessages = {
  filterPlaceholder: 'Filter...',
};

export class TableFilterRow extends React.PureComponent {
  render() {
    const {
      getCellComponent, messages, ...restProps
    } = this.props;

    return (
      <TableFilterRowBase
        getCellComponent={combineTemplates(
          getCellComponent,
          defaultGetCellComponent,
        )}
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
  getCellComponent: PropTypes.func,
  messages: PropTypes.shape({
    filterPlaceholder: PropTypes.string,
  }),
};

TableFilterRow.defaultProps = {
  getCellComponent: undefined,
  messages: {},
};
