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

export const styleSheet = createStyleSheet('TableHeaderCell', theme => ({
  groupingControl: {
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
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  plainTitle: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
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
    paddingRight: theme.spacing.unit,
    '& ~ $cell': {
      paddingLeft: theme.spacing.unit,
    },
  },
  cellNoUserSelect: {
    userSelect: 'none',
    MozUserSelect: 'none',
    WebkitUserSelect: 'none',
    width: '100%',
  },
  cellDraggable: {
    cursor: 'pointer',
  },
  cellClickable: {
    cursor: 'pointer',
  },
  cellDimmed: {
    opacity: 0.3,
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

class TableHeaderCellBase extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      dragging: false,
    };
  }
  render() {
    const {
      style, column,
      allowSorting, sortingDirection, changeSortingDirection,
      allowGroupingByClick, groupByColumn,
      allowDragging, dragPayload,
      classes,
    } = this.props;
    const { dragging } = this.state;
    const align = column.align || 'left';
    const invertedAlign = align === 'left' ? 'right' : 'left';
    const columnTitle = column.title || column.name;

    const groupingControlClasses = classNames(
      {
        [classes.groupingControl]: true,
        [classes.floatLeft]: invertedAlign === 'left',
        [classes.floatRight]: invertedAlign === 'right',
      },
    );

    const tableCellClasses = classNames(
      {
        [classes.cell]: true,
        [classes.cellRight]: align === 'right',
        [classes.clearPadding]: !column.name,
        [classes.cellNoUserSelect]: allowDragging || allowSorting,
        [classes.cellDraggable]: allowDragging,
        [classes.cellClickable]: allowSorting,
        [classes.cellDimmed]: dragging || column.isDraft,
      },
    );

    const titleClasses = classNames(
      {
        [classes.title]: true,
        [classes.titleRight]: align === 'right',
        [classes.titleLeft]: align === 'left',
      },
    );

    const groupingControl = allowGroupingByClick && (
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
        {groupingControl}
        <div className={titleClasses}>
          {allowSorting ? sortingControl : (
            <div className={classes.plainTitle}>
              {columnTitle}
            </div>
          )}
        </div>
      </TableCell>
    );

    return allowDragging ? (
      <DragSource
        ref={(element) => { this.cellRef = element; }}
        getPayload={() => dragPayload}
        onStart={() => this.setState({ dragging: true })}
        onEnd={() => this.cellRef && this.setState({ dragging: false })}
      >
        {cellLayout}
      </DragSource>
    ) : cellLayout;
  }
}

TableHeaderCellBase.propTypes = {
  column: PropTypes.shape({
    title: PropTypes.string,
  }).isRequired,
  style: PropTypes.shape(),
  allowSorting: PropTypes.bool,
  sortingDirection: PropTypes.oneOf(['asc', 'desc', null]),
  changeSortingDirection: PropTypes.func,
  allowGroupingByClick: PropTypes.bool,
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
  allowGroupingByClick: false,
  groupByColumn: undefined,
  allowDragging: false,
  dragPayload: null,
};

export const TableHeaderCell = withStyles(styleSheet)(TableHeaderCellBase);
