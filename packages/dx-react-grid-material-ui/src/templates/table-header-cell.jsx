import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { DragSource } from '@devexpress/dx-react-core';

import { TableCell } from 'material-ui';
import { withStyles } from 'material-ui/styles';

import { GroupingControl } from './table-header-cell/grouping-control';
import { ResizingControl } from './table-header-cell/resizing-control';
import { SortingControl } from './table-header-cell/sorting-control';

const styles = theme => ({
  plainTitle: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
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
});

class TableHeaderCellBase extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      dragging: false,
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
  }
  render() {
    const {
      style, column, tableColumn,
      allowSorting, sortingDirection,
      allowGroupingByClick, groupByColumn,
      allowDragging, dragPayload,
      allowResizing, changeColumnWidth, changeDraftColumnWidth,
      classes,
    } = this.props;
    const { dragging } = this.state;
    const align = column.align || 'left';
    const columnTitle = column.title || column.name;

    const tableCellClasses = classNames({
      [classes.cell]: true,
      [classes.cellRight]: align === 'right',
      [classes.cellNoUserSelect]: allowDragging || allowSorting,
      [classes.cellDraggable]: allowDragging,
      [classes.cellClickable]: allowSorting,
      [classes.cellDimmed]: dragging || tableColumn.draft,
    });

    const titleClasses = classNames({
      [classes.title]: true,
      [classes.titleRight]: align === 'right',
      [classes.titleLeft]: align === 'left',
    });

    const cellLayout = (
      <TableCell
        onClick={this.onCellClick}
        style={style}
        className={tableCellClasses}
      >
        {allowGroupingByClick && (
          <GroupingControl
            align={align}
            groupByColumn={groupByColumn}
          />
        )}
        <div className={titleClasses}>
          {allowSorting ? (
            <SortingControl
              align={align}
              sortingDirection={sortingDirection}
              columnTitle={columnTitle}
            />
          ) : (
            <div className={classes.plainTitle}>
              {columnTitle}
            </div>
          )}
        </div>
        {allowResizing && (
          <ResizingControl
            changeColumnWidth={changeColumnWidth}
            changeDraftColumnWidth={changeDraftColumnWidth}
          />
        )}
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
