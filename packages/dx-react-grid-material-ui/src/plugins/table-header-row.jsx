import * as React from 'react';
import * as PropTypes from 'prop-types';
import { TableHeaderRow as TableHeaderRowBase } from '@devexpress/dx-react-grid';
import { TableHeaderCell } from '../templates/table-header-cell';
import { CellContent } from '../templates/table-header-cell/cell-content';
import { SortingControl } from '../templates/table-header-cell/sorting-control';
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
        cellContentComponent={CellContent}
        rowComponent={TableRow}
        sortingComponent={SortingControl}
        messages={{ ...defaultMessages, ...messages }}
        {...restProps}
      />
    );
  }
}

TableHeaderRow.Cell = TableHeaderCell;
TableHeaderRow.CellContent = CellContent;
TableHeaderRow.Row = TableRow;
TableHeaderRow.SortingControl = SortingControl;

TableHeaderRow.propTypes = {
  messages: PropTypes.shape({
    sortingHint: PropTypes.string,
  }),
};

TableHeaderRow.defaultProps = {
  messages: {},
};
