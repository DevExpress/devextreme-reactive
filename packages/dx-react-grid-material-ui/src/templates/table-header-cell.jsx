import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

import { DragSource } from '@devexpress/dx-react-core';

import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';

import { GroupingControl } from './table-header-cell/grouping-control';
import { ResizingControl } from './table-header-cell/resizing-control';
import { SortingControl } from './table-header-cell/sorting-control';

const ENTER_KEY_CODE = 13;
const SPACE_KEY_CODE = 32;

const styles = theme => ({
  plainTitle: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
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
    '&:hover $resizeHandleLine': {
      opacity: 1,
    },
  },
  resizeHandleLine: {
    opacity: 0,
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
    resizeHandle: {
      '&:hover $resizeHandleLine': {
        opacity: 1,
      },
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
  cellCenter: {
    textAlign: 'center',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    width: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  contentRight: {
    flexDirection: 'row-reverse',
  },
  contentNoWrap: {
    whiteSpace: 'nowrap',
  },
});

class TableHeaderCellBase extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      dragging: false,
    };

    this.onClick = (e) => {
      const { onSort, sortingEnabled } = this.props;
      if (!sortingEnabled) return;

      const isActionKeyDown = e.keyCode === ENTER_KEY_CODE || e.keyCode === SPACE_KEY_CODE;
      const isMouseClick = e.keyCode === undefined;

      const cancelSortingRelatedKey = e.metaKey || e.ctrlKey;
      const direction = (isMouseClick || isActionKeyDown) && cancelSortingRelatedKey
        ? null
        : undefined;

      e.preventDefault();
      onSort({
        direction,
        keepOther: e.shiftKey || cancelSortingRelatedKey,
      });
    };
  }

  render() {
    const {
      style, column, tableColumn,
      showSortingControls, sortingDirection,
      showGroupingControls, onGroup, groupingEnabled,
      draggingEnabled,
      resizingEnabled, onWidthChange, onWidthDraft, onWidthDraftCancel, sortingEnabled,
      classes, getMessage, tableRow, className, onSort, before,
      ...restProps
    } = this.props;

    const { dragging } = this.state;
    const align = (tableColumn && tableColumn.align) || 'left';
    const columnTitle = column && (column.title || column.name);

    const tableCellClasses = classNames({
      [classes.cell]: true,
      [classes.cellRight]: align === 'right',
      [classes.cellCenter]: align === 'center',
      [classes.cellNoUserSelect]: draggingEnabled || showSortingControls,
      [classes.cellDraggable]: draggingEnabled,
      [classes.cellDimmed]: dragging || (tableColumn && tableColumn.draft),
    }, className);
    const contentClassed = classNames({
      [classes.content]: true,
      [classes.contentNoWrap]: !(tableColumn && tableColumn.wordWrapEnabled),
      [classes.contentRight]: align === 'right',
    });
    const cellLayout = (
      <TableCell
        style={style}
        className={tableCellClasses}
        numeric={align === 'right'}
        {...restProps}
      >
        <div className={classes.container}>
          {before}
          <div className={contentClassed}>
            {showSortingControls ? (
              <SortingControl
                align={align}
                disabled={!sortingEnabled}
                sortingDirection={sortingDirection}
                columnTitle={columnTitle}
                onClick={this.onClick}
                getMessage={getMessage}
              />
            ) : (
              <span className={classes.plainTitle}>
                {columnTitle}
              </span>
            )}
          </div>
          {showGroupingControls && (
            <div className={classes.controls}>
              <GroupingControl
                disabled={!groupingEnabled}
                onGroup={onGroup}
              />
            </div>
          )}
        </div>
        {resizingEnabled && (
          <ResizingControl
            onWidthChange={onWidthChange}
            onWidthDraft={onWidthDraft}
            onWidthDraftCancel={onWidthDraftCancel}
            resizeHandleOpacityClass={classes.resizeHandleLine}
          />
        )}
      </TableCell>
    );

    return draggingEnabled ? (
      <DragSource
        ref={(element) => { this.cellRef = element; }}
        payload={[{ type: 'column', columnName: column.name }]}
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
  showSortingControls: PropTypes.bool,
  sortingEnabled: PropTypes.bool,
  sortingDirection: PropTypes.oneOf(['asc', 'desc', null]),
  onSort: PropTypes.func,
  showGroupingControls: PropTypes.bool,
  groupingEnabled: PropTypes.bool,
  onGroup: PropTypes.func,
  draggingEnabled: PropTypes.bool,
  resizingEnabled: PropTypes.bool,
  onWidthChange: PropTypes.func,
  onWidthDraft: PropTypes.func,
  onWidthDraftCancel: PropTypes.func,
  classes: PropTypes.object.isRequired,
  getMessage: PropTypes.func.isRequired,
  className: PropTypes.string,
  before: PropTypes.node,
};

TableHeaderCellBase.defaultProps = {
  column: undefined,
  tableColumn: undefined,
  tableRow: undefined,
  style: null,
  showSortingControls: false,
  sortingDirection: undefined,
  sortingEnabled: false,
  onSort: undefined,
  showGroupingControls: false,
  groupingEnabled: false,
  onGroup: undefined,
  draggingEnabled: false,
  resizingEnabled: false,
  onWidthChange: undefined,
  onWidthDraft: undefined,
  onWidthDraftCancel: undefined,
  className: undefined,
  before: undefined,
};

export const TableHeaderCell = withStyles(styles, { name: 'TableHeaderCell' })(TableHeaderCellBase);
