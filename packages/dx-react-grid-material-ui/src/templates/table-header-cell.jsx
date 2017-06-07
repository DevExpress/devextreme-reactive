import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  TableCell,
  TableSortLabel,
} from 'material-ui';

import List from 'material-ui-icons/List';

import { withStyles, createStyleSheet } from 'material-ui/styles';

const styleSheet = createStyleSheet('TableHeaderCell', theme => ({
  gropingControl: {
    cursor: 'pointer',
    paddingLeft: theme.spacing.unit * 3,
    width: (theme.spacing.unit * 2) - 2,
    height: theme.spacing.unit * 3,
  },
  floatLeft: {
    float: 'left',
    textAlign: 'left',
  },
  floatRight: {
    float: 'right',
    textAlign: 'right',
  },
  cell: {
    paddingRight: theme.spacing.unit * 3,
  },
  clearPadding: {
    padding: 0,
  },
  title: {
    height: '24px',
    lineHeight: '24px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    verticalAlign: 'middle',
    textOverflow: 'ellipsis',
  },
  titleRight: {
    textAlign: 'right',
    marginLeft: (theme.spacing.unit * 2) - 2,
  },
  titleLeft: {
    textAlign: 'left',
    marginRight: (theme.spacing.unit * 2) - 2,
  },
}));

export const TableHeaderCellBase = ({
  style, column,
  allowSorting, sortingDirection, changeSortingDirection,
  allowGrouping, groupByColumn, classes,
}) => {
  const align = column.align || 'left';
  const invertedAlign = align === 'left' ? 'right' : 'left';
  const columnTitle = column.title || column.name;

  const groupingControlClasses = classNames(
    {
      [classes.gropingControl]: true,
      [classes.floatLeft]: invertedAlign === 'left',
      [classes.floatRight]: invertedAlign === 'right',
    },
  );

  const tableCellClasses = classNames(
    {
      [classes.cell]: true,
      [classes.clearPadding]: !column.name,
    },
  );

  const titleClasses = classNames(
    {
      [classes.title]: true,
      [classes.titleRight]: align === 'right',
      [classes.titleLeft]: align === 'left',
    },
  );

  const gropingControl = allowGrouping && (
    <div
      onClick={(e) => {
        e.stopPropagation();
        groupByColumn(e);
      }}
      className={groupingControlClasses}
    >
      <List />
    </div>
  );

  const sortingControl = allowSorting && (
    <TableSortLabel
      active={!!sortingDirection}
      direction={sortingDirection}
    >
      {columnTitle}
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
      className={tableCellClasses}
    >
      {gropingControl}
      <div className={titleClasses}>
        {allowSorting ? sortingControl : (
          columnTitle
        )}
      </div>
    </TableCell>
  );
};

TableHeaderCellBase.defaultProps = {
  style: null,
  allowSorting: false,
  sortingDirection: undefined,
  changeSortingDirection: undefined,
  allowGrouping: false,
  groupByColumn: undefined,
};

TableHeaderCellBase.propTypes = {
  column: PropTypes.shape({
    title: PropTypes.string,
  }).isRequired,
  style: PropTypes.shape(),
  allowSorting: PropTypes.bool,
  sortingDirection: PropTypes.oneOf(['asc', 'desc', null]),
  changeSortingDirection: PropTypes.func,
  allowGrouping: PropTypes.bool,
  groupByColumn: PropTypes.func,
  classes: PropTypes.object.isRequired,
};

export const TableHeaderCell = withStyles(styleSheet)(TableHeaderCellBase);
