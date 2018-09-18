import * as React from 'react';
import { TableHeaderRow as TableHeaderRowBase } from '@devexpress/dx-react-grid';
import { TableHeaderCell } from '../templates/table-header-cell';
import { TableRow } from '../templates/table-row';
import { SortLabel } from '../templates/table-header-cell/sort-label';
import { GroupButton } from '../templates/table-header-cell/group-button';
import { Title } from '../templates/table-header-cell/title';
import { Content } from '../templates/table-header-cell/content';

export class TableHeaderRow extends React.PureComponent {
  render() {
    return (
      <TableHeaderRowBase
        cellComponent={TableHeaderCell}
        rowComponent={TableRow}
        contentComponent={Content}
        sortLabelComponent={SortLabel}
        titleComponent={Title}
        groupButtonComponent={GroupButton}
        {...this.props}
      />
    );
  }
}

TableHeaderRow.Cell = TableHeaderCell;
TableHeaderRow.Row = TableRow;
TableHeaderRow.Content = Content;
TableHeaderRow.SortLabel = SortLabel;
TableHeaderRow.Title = Title;
TableHeaderRow.GroupButton = GroupButton;
