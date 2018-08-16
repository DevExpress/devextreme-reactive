import * as React from 'react';
import * as PropTypes from 'prop-types';
import { TableHeaderRow as TableHeaderRowBase } from '@devexpress/dx-react-grid';
import { TableHeaderCell } from '../templates/table-header-cell';
import { Content } from '../templates/table-header-cell/content';
import { SortLabel } from '../templates/table-header-cell/sort-label';
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
        cellContentComponent={Content}
        rowComponent={TableRow}
        sortLabelComponent={SortLabel}
        messages={{ ...defaultMessages, ...messages }}
        {...restProps}
      />
    );
  }
}

TableHeaderRow.Cell = TableHeaderCell;
TableHeaderRow.Content = Content;
TableHeaderRow.Row = TableRow;
TableHeaderRow.SortLabel = SortLabel;

TableHeaderRow.propTypes = {
  messages: PropTypes.shape({
    sortingHint: PropTypes.string,
  }),
};

TableHeaderRow.defaultProps = {
  messages: {},
};
