import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

import { DragSource } from '@devexpress/dx-react-core';

import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';

import { GroupingControl } from './table-header-cell/grouping-control';
import { ResizingControl } from './table-header-cell/resizing-control';

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
  cellNoWrap: {
    whiteSpace: 'nowrap',
  },
});

class TableHeaderCellBase extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      dragging: false,
    };
  }

  render() {
    const {
      style, column, tableColumn,
      showGroupingControls, onGroup, groupingEnabled,
      draggingEnabled,
      resizingEnabled, onWidthChange, onWidthDraft, onWidthDraftCancel,
      classes, getMessage, tableRow, className, children,
      // @deprecated
      showSortingControls, sortingDirection, sortingEnabled, onSort, before,
      ...restProps
    } = this.props;

    const { dragging } = this.state;
    const align = (tableColumn && tableColumn.align) || 'left';

    const tableCellClasses = classNames({
      [classes.cell]: true,
      [classes.cellRight]: align === 'right',
      [classes.cellCenter]: align === 'center',
      [classes.cellNoUserSelect]: draggingEnabled,
      [classes.cellDraggable]: draggingEnabled,
      [classes.cellDimmed]: dragging || (tableColumn && tableColumn.draft),
      [classes.cellNoWrap]: !(tableColumn && tableColumn.wordWrapEnabled),
    }, className);
    const cellLayout = (
      <TableCell
        style={style}
        className={tableCellClasses}
        numeric={align === 'right'}
        {...restProps}
      >
        <div className={classes.container}>
          {children}
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
  children: PropTypes.node,
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
  children: undefined,
  before: undefined,
};

export const TableHeaderCell = withStyles(styles, { name: 'TableHeaderCell' })(TableHeaderCellBase);
