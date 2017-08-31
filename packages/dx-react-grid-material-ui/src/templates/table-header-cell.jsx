import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Draggable, DragSource } from '@devexpress/dx-react-core';

import {
  TableCell,
  TableSortLabel,
} from 'material-ui';

import List from 'material-ui-icons/List';

import { withStyles } from 'material-ui/styles';

const styles = theme => ({
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
    position: 'relative',
    overflow: 'visible',
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
  resizeHandle: {
    position: 'absolute',
    userSelect: 'none',
    MozUserSelect: 'none',
    WebkitUserSelect: 'none',
    width: '16px',
    top: 0,
    right: '-8px',
    height: '100%',
    cursor: 'col-resize',
    zIndex: 100,
  },
  resizeHandleLine: {
    position: 'absolute',
    backgroundColor: theme.palette.grey[300],
    height: '50%',
    width: '1px',
    top: '25%',
    transition: 'all linear 100ms',
  },
  resizeHandleActive: {
    '& $resizeHandleLine': {
      backgroundColor: theme.palette.primary[300],
    },
  },
  '@media (pointer: fine)': {
    resizeHandleLine: {
      opacity: 0,
    },
    resizeHandleActive: {
      '& $resizeHandleLine': {
        opacity: 1,
      },
    },
    cell: {
      '&:hover $resizeHandleLine': {
        opacity: 1,
      },
    },
  },
});

class TableHeaderCellBase extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      dragging: false,
      resizing: false,
    };

    this.onCellClick = (e) => {
      const { allowSorting, changeSortingDirection } = this.props;
      if (!allowSorting) return;
      e.stopPropagation();
      const cancelSortingRelatedKey = e.metaKey || e.ctrlKey;
      changeSortingDirection({
        keepOther: e.shiftKey || cancelSortingRelatedKey,
        cancel: cancelSortingRelatedKey,
      });
    };

    this.onResizeStart = ({ x }) => {
      this.resizeStartingX = x;
      this.setState({ resizing: true });
    };
    this.onResizeUpdate = ({ x }) => {
      const { changeDraftColumnWidth } = this.props;
      changeDraftColumnWidth({ shift: x - this.resizeStartingX });
    };
    this.onResizeEnd = ({ x }) => {
      const { changeColumnWidth } = this.props;
      changeColumnWidth({ shift: x - this.resizeStartingX });
      this.setState({ resizing: false });
    };
  }
  render() {
    const {
      style, column, tableColumn,
      allowSorting, sortingDirection,
      allowGroupingByClick, groupByColumn,
      allowDragging, dragPayload,
      allowResizing,
      classes,
    } = this.props;
    const { dragging, resizing } = this.state;
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
        [classes.cellNoUserSelect]: allowDragging || allowSorting,
        [classes.cellDraggable]: allowDragging,
        [classes.cellClickable]: allowSorting,
        [classes.cellDimmed]: dragging || tableColumn.draft,
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

    const resizingControl = allowResizing && (
      <Draggable
        onStart={this.onResizeStart}
        onUpdate={this.onResizeUpdate}
        onEnd={this.onResizeEnd}
      >
        <div
          className={classNames({
            [classes.resizeHandle]: true,
            [classes.resizeHandleActive]: resizing,
          })}
        >
          <div
            className={classes.resizeHandleLine}
            style={{ left: '5px' }}
          />
          <div
            className={classes.resizeHandleLine}
            style={{ left: '7px' }}
          />
        </div>
      </Draggable>
    );

    const cellLayout = (
      <TableCell
        onClick={this.onCellClick}
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
        {resizingControl}
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
  tableColumn: PropTypes.object,
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
  allowResizing: PropTypes.bool,
  changeColumnWidth: PropTypes.func,
  changeDraftColumnWidth: PropTypes.func,
  classes: PropTypes.object.isRequired,
};

TableHeaderCellBase.defaultProps = {
  tableColumn: {},
  style: null,
  allowSorting: false,
  sortingDirection: undefined,
  changeSortingDirection: undefined,
  allowGroupingByClick: false,
  groupByColumn: undefined,
  allowDragging: false,
  dragPayload: null,
  allowResizing: false,
  changeColumnWidth: undefined,
  changeDraftColumnWidth: undefined,
};

export const TableHeaderCell = withStyles(styles, { name: 'TableHeaderCell' })(TableHeaderCellBase);
