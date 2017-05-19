import React from 'react';
import PropTypes from 'prop-types';

import {
  TableCell,
  TableSortLabel,
} from 'material-ui';

import List from 'material-ui-icons/List';

export const TableHeaderCell = ({
  style, column,
  allowSorting, sortingDirection, changeSortingDirection,
  allowGrouping, groupByColumn,
}) => {
  const align = column.align || 'left';
  const invertedAlign = align === 'left' ? 'right' : 'left';

  const gropingControl = allowGrouping && (
    <div
      onClick={(e) => {
        e.stopPropagation();
        groupByColumn(e);
      }}
      style={{
        float: invertedAlign,
        textAlign: invertedAlign,
        width: '14px',
      }}
    >
      <List />
    </div>
  );

  const sortingControl = allowSorting && (
    <TableSortLabel
      active={!!sortingDirection}
      direction={sortingDirection}
    >
      {column.title}
    </TableSortLabel>
  );

  return (
    <TableCell
      onClick={(e) => {
        if (!allowSorting) return;
        e.stopPropagation();
        changeSortingDirection({ keepOther: e.shiftKey });
      }}
      style={style}
    >
      {gropingControl}
      <div
        style={{
          [`margin${column.align === 'right' ? 'Left' : 'Right'}`]: '14px',
          textAlign: align,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {allowSorting ? sortingControl : (
          column.title
        )}
      </div>
    </TableCell>
  );
};
TableHeaderCell.defaultProps = {
  style: null,
  allowSorting: false,
  sortingDirection: undefined,
  changeSortingDirection: undefined,
  allowGrouping: false,
  groupByColumn: undefined,
};
TableHeaderCell.propTypes = {
  column: PropTypes.shape({
    title: PropTypes.string,
  }).isRequired,
  style: PropTypes.shape(),
  allowSorting: PropTypes.bool,
  sortingDirection: PropTypes.oneOf(['asc', 'desc', null]),
  changeSortingDirection: PropTypes.func,
  allowGrouping: PropTypes.bool,
  groupByColumn: PropTypes.func,
};
