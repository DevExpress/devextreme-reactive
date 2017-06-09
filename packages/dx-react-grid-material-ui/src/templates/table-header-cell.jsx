import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { DragSource } from '@devexpress/dx-react-core';

import {
  TableCell,
  TableSortLabel,
} from 'material-ui';

import List from 'material-ui-icons/List';

import { withStyles, createStyleSheet } from 'material-ui/styles';

const styleSheet = createStyleSheet('TableHeaderCell', theme => ({
  gropingControl: {
    cursor: 'pointer',
    paddingLeft: 0,
    height: theme.spacing.unit * 3,
  },
  sortingControl: {
    cursor: 'pointer',
    display: 'inline-block',
    paddingTop: theme.spacing.unit / 2,
  },
  sortingTitle: {
    lineHeight: '18px',
    display: 'inline-block',
    verticalAlign: 'top',
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
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    userSelect: 'none',
    MozUserSelect: 'none',
    WebkitUserSelect: 'none',
    width: '100%',
  },
  cellRight: {
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
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
  allowGrouping, groupByColumn,
  allowDragging, dragPayload,
  classes,
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
      [classes.cellRight]: align === 'right',
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
    align === 'right' ? (
      <span className={classes.sortingControl}>
        {!!sortingDirection && <TableSortLabel
          active={!!sortingDirection}
          direction={sortingDirection}
        />}
        <span className={classes.sortingTitle}>
          {columnTitle}
        </span>
      </span>
    ) : (
      <span className={classes.sortingControl}>
        <span className={classes.sortingTitle}>
          {columnTitle}
        </span>
        <TableSortLabel
          active={!!sortingDirection}
          direction={sortingDirection}
        />
      </span>
    )
  );

  const cellLayout = (
    <TableCell
      onClick={(e) => {
        if (!allowSorting) return;
        e.stopPropagation();
        const cancelSortingRelatedKey = e.metaKey || e.ctrlKey;
        changeSortingDirection({
          keepOther: e.shiftKey || cancelSortingRelatedKey,
          cancel: cancelSortingRelatedKey,
        });
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

  return allowDragging ? (
    <DragSource getPayload={() => dragPayload}>
      {cellLayout}
    </DragSource>
  ) : cellLayout;
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
  allowDragging: PropTypes.bool,
  dragPayload: PropTypes.any,
  classes: PropTypes.object.isRequired,
};

TableHeaderCellBase.defaultProps = {
  style: null,
  allowSorting: false,
  sortingDirection: undefined,
  changeSortingDirection: undefined,
  allowGrouping: false,
  groupByColumn: undefined,
  allowDragging: false,
  dragPayload: null,
};

export const TableHeaderCell = withStyles(styleSheet)(TableHeaderCellBase);
