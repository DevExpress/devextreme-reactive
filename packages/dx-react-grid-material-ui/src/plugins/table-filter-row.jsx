import * as React from 'react';
import * as PropTypes from 'prop-types';
import { TableFilterRow as TableFilterRowBase } from '@devexpress/dx-react-grid';
import { TableFilterCell } from '../templates/table-filter-cell';
import { TableRow } from '../templates/table-row';
import { Icon } from '../templates/filter-row/icon';
import { DropDown } from '../templates/filter-row/drop-down';
import { Editor } from '../templates/filter-row/editor';

const defaultMessages = {
  filterPlaceholder: 'Filter...',
  contains: 'Contains',
  notContains: 'Does not contain',
  startsWith: 'Starts with',
  endsWith: 'Ends with',
  equal: 'Equals',
  notEqual: 'Does not equal',
  greaterThan: 'Greater than',
  greaterThanOrEqual: 'Greater than or equal to',
  lessThan: 'Less than',
  lessThanOrEqual: 'Less than or equal to',
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
        filterSelectorComponent={DropDown}
        iconComponent={Icon}
        editorComponent={Editor}
        messages={{ ...defaultMessages, ...messages }}
        {...restProps}
      />
    );
  }
}

TableFilterRow.Cell = TableFilterCell;
TableFilterRow.Row = TableRow;
TableFilterRow.Icon = Icon;

TableFilterRow.propTypes = {
  messages: PropTypes.shape({
    filterPlaceholder: PropTypes.string,
    contains: PropTypes.string,
    notContains: PropTypes.string,
    startsWith: PropTypes.string,
    endsWith: PropTypes.string,
    equal: PropTypes.string,
    notEqual: PropTypes.string,
    greaterThan: PropTypes.string,
    greaterThanOrEqual: PropTypes.string,
    lessThan: PropTypes.string,
    lessThanOrEqual: PropTypes.string,
  }),
};

TableFilterRow.defaultProps = {
  messages: {},
};
