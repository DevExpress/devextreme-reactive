import * as React from 'react';
import * as PropTypes from 'prop-types';

import { TableSummaryRow as TableSummaryRowBase } from '@devexpress/dx-react-grid';
import { TableSummaryItem } from '../templates/table-summary-item';
import { TableCell } from '../templates/table-cell';
import { TableRow } from '../templates/table-row';
import { TableTreeIndent } from '../templates/table-tree-indent';
import { TableTreeContent } from '../templates/table-tree-content';
import { TableTreeCell } from '../templates/table-tree-cell';

const defaultMessages = {
  sum: 'Sum',
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
        totalRowComponent={TableRow}
        groupRowComponent={TableRow}
        treeRowComponent={TableRow}
        totalCellComponent={TableCell}
        groupCellComponent={TableCell}
        treeCellComponent={TableCell}
        itemComponent={TableSummaryItem}
        treeColumnCellComponent={TableTreeCell}
        treeColumnContentComponent={TableTreeContent}
        treeColumnIndentComponent={TableTreeIndent}
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

TableSummaryRow.TotalRow = TableRow;
TableSummaryRow.GroupRow = TableRow;
TableSummaryRow.TreeRow = TableRow;
TableSummaryRow.TotalCell = TableCell;
TableSummaryRow.GroupCell = TableCell;
TableSummaryRow.TreeCell = TableCell;
TableSummaryRow.Item = TableSummaryItem;
TableSummaryRow.TableTreeCell = TableTreeCell;
TableSummaryRow.TableTreeIndent = TableTreeIndent;
TableSummaryRow.TableTreeContent = TableTreeContent;
