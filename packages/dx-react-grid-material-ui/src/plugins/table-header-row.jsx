import * as React from 'react';
import * as PropTypes from 'prop-types';
import { TableHeaderRow as TableHeaderRowBase } from '@devexpress/dx-react-grid';
import { TableHeaderCell } from '../templates/table-header-cell';
import { Content } from '../templates/table-header-cell/content';
import { SortLabel } from '../templates/table-header-cell/sort-label';
import { GroupButton } from '../templates/table-header-cell/group-button';
import { Title } from '../templates/table-header-cell/title';
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
        contentComponent={Content}
        rowComponent={TableRow}
        sortLabelComponent={SortLabel}
        titleComponent={Title}
        groupButtonComponent={GroupButton}
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
TableHeaderRow.Title = Title;
TableHeaderRow.GroupButton = GroupButton;

TableHeaderRow.propTypes = {
  messages: PropTypes.shape({
    sortingHint: PropTypes.string,
  }),
};

TableHeaderRow.defaultProps = {
  messages: {},
};
