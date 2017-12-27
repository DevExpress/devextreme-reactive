import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { DragSource } from '@devexpress/dx-react-core';

import { TableCell } from 'material-ui';
import { withStyles } from 'material-ui/styles';

import { GroupingControl } from './table-header-cell/grouping-control';
import { ResizingControl } from './table-header-cell/resizing-control';
import { SortingControl } from './table-header-cell/sorting-control';

const ENTER_KEY_CODE = 13;
const SPACE_KEY_CODE = 32;

const styles = theme => ({
  plainTitle: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    height: theme.spacing.unit * 3,
    lineHeight: `${theme.spacing.unit * 3}px`,
  },
  cell: {
    outline: 'none',
    position: 'relative',
    overflow: 'visible',
    paddingRight: theme.spacing.unit,
    paddingLeft: theme.spacing.unit,
    '&:first-child': {
      paddingLeft: theme.spacing.unit * 3,
    },
  },
  cellNoUserSelect: {
    userSelect: 'none',
    MozUserSelect: 'none',
    WebkitUserSelect: 'none',
  },
  cellDraggable: {
    cursor: 'pointer',
  },
  cellDimmed: {
    opacity: 0.3,
  },
  cellRight: {
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
  },
});

class TableHeaderCellBase extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      dragging: false,
    };

    this.onClick = (e) => {
      const { onSort } = this.props;
      const isActionKeyDown = e.keyCode === ENTER_KEY_CODE || e.keyCode === SPACE_KEY_CODE;
      const isMouseClick = e.keyCode === undefined;

      const cancelSortingRelatedKey = e.metaKey || e.ctrlKey;
      const cancel = (isMouseClick && cancelSortingRelatedKey)
        || (isActionKeyDown && cancelSortingRelatedKey);

      e.preventDefault();
      onSort({
        keepOther: e.shiftKey || cancelSortingRelatedKey,
        cancel,
      });
    };
  }
  render() {
    const {
      style, column, tableColumn,
      allowSorting, sortingDirection,
      showGroupingControls, onGroup,
      allowDragging,
      allowResizing, onWidthChange, onDraftWidthChange,
      classes, getMessage, tableRow, className, onSort,
      ...restProps
    } = this.props;

    const { dragging } = this.state;
    const align = (tableColumn && tableColumn.align) || 'left';
    const columnTitle = column && (column.title || column.name);

    const tableCellClasses = classNames({
      [classes.cell]: true,
      [classes.cellRight]: align === 'right',
      [classes.cellNoUserSelect]: allowDragging || allowSorting,
      [classes.cellDraggable]: allowDragging,
      [classes.cellDimmed]: dragging || (tableColumn && tableColumn.draft),
    }, className);
    const cellLayout = (
      <TableCell
        style={style}
        className={tableCellClasses}
        numeric={align === 'right'}
        {...restProps}
      >
        {showGroupingControls && (
          <GroupingControl
            align={align}
            onGroup={onGroup}
          />
        )}
        {allowSorting ? (
          <SortingControl
            align={align}
            sortingDirection={sortingDirection}
            columnTitle={columnTitle}
            onClick={this.onClick}
            getMessage={getMessage}
          />
        ) : (
          <div className={classes.plainTitle}>
            {columnTitle}
          </div>
        )}
        {allowResizing && (
          <ResizingControl
            onWidthChange={onWidthChange}
            onDraftWidthChange={onDraftWidthChange}
          />
        )}
      </TableCell>
    );

    return allowDragging ? (
      <DragSource
        ref={(element) => { this.cellRef = element; }}
        getPayload={() => [{ type: 'column', columnName: column.name }]}
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
  tableRow: PropTypes.object,
  column: PropTypes.object,
  style: PropTypes.object,
  allowSorting: PropTypes.bool,
  sortingDirection: PropTypes.oneOf(['asc', 'desc', null]),
  onSort: PropTypes.func,
  showGroupingControls: PropTypes.bool,
  onGroup: PropTypes.func,
  allowDragging: PropTypes.bool,
  allowResizing: PropTypes.bool,
  onWidthChange: PropTypes.func,
  onDraftWidthChange: PropTypes.func,
  classes: PropTypes.object.isRequired,
  getMessage: PropTypes.func.isRequired,
  className: PropTypes.string,
};

TableHeaderCellBase.defaultProps = {
  column: undefined,
  tableColumn: undefined,
  tableRow: undefined,
  style: null,
  allowSorting: false,
  sortingDirection: undefined,
  onSort: undefined,
  showGroupingControls: false,
  onGroup: undefined,
  allowDragging: false,
  allowResizing: false,
  onWidthChange: undefined,
  onDraftWidthChange: undefined,
  className: undefined,
};

export const TableHeaderCell = withStyles(styles, { name: 'TableHeaderCell' })(TableHeaderCellBase);
