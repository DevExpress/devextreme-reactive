import React from 'react';
import PropTypes from 'prop-types';
import { combineTemplates } from '@devexpress/dx-react-core';
import { TableHeaderRow as TableHeaderRowBase } from '@devexpress/dx-react-grid';
import { TableHeaderCell } from '../templates/table-header-cell';
import { TableRow } from '../templates/table-row';

const defaultGetHeaderCellComponent = () => TableHeaderCell;

const defaultMessages = {
  sortingHint: 'Sort',
};

export class TableHeaderRow extends React.PureComponent {
  render() {
    const {
      getHeaderCellComponent,
      messages,
      ...restProps
    } = this.props;

    return (
      <TableHeaderRowBase
        getHeaderCellComponent={combineTemplates(
          getHeaderCellComponent,
          defaultGetHeaderCellComponent,
        )}
        headerRowComponent={TableRow}
        messages={{ ...defaultMessages, ...messages }}
        {...restProps}
      />
    );
  }
}

TableHeaderRow.propTypes = {
  getHeaderCellComponent: PropTypes.func,
  messages: PropTypes.shape({
    sortingHint: PropTypes.string,
  }),
};

TableHeaderRow.defaultProps = {
  getHeaderCellComponent: undefined,
  messages: {},
};
