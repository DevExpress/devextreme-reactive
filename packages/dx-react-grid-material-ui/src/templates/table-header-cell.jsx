import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';

import { DragSource } from '@devexpress/dx-react-core';

import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';

import { ResizingControl } from './table-header-cell/resizing-control';

const styles = theme => ({
  plainTitle: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    lineHeight: theme.spacing(3),
  },
  cell: {
    outline: 'none',
    position: 'relative',
    overflow: 'visible',
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    '&:first-child': {
      paddingLeft: theme.spacing(3),
    },
    '&:hover $resizeHandleLine': {
      opacity: 1,
    },
    '&:nth-last-child(2) $resizeHandle': {
      width: theme.spacing(1),
      right: '1px',
    },
  },
  resizeHandle: {},
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
    '&:after': {
      content: '""',
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      backgroundColor: theme.palette.background.paper,
      opacity: 0.7,
      pointerEvents: 'none',
      zIndex: 400,
    },
  },
  cellRight: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    textAlign: 'right',
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
  cellFixed: {
    position: 'sticky',
    top: 0,
    background: theme.palette.background.paper,
  },
});

class TableHeaderCellBase extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      dragging: false,
    };
    this.dragRef = React.createRef();
    this.cellRef = React.createRef();
    this.getWidthGetter = () => {
      const { getCellWidth } = this.props;
      const node = this.cellRef.current;
      return node && getCellWidth(() => {
        const { width } = node.getBoundingClientRect();
        return width;
      });
    };

    this.onDragStart = () => {
      this.setState({ dragging: true });
    };
    this.onDragEnd = () => {
      if (this.dragRef.current) {
        this.setState({ dragging: false });
      }
    };
  }

  componentDidMount() {
    this.getWidthGetter();
  }

  render() {
    const {
      style, column, tableColumn,
      draggingEnabled, resizingEnabled,
      onWidthChange, onWidthDraft, onWidthDraftCancel, getCellWidth,
      classes, tableRow, className, children, isFixed,
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
      [classes.cellFixed]: isFixed,
    }, className);
    const cellLayout = (
      <TableCell
        style={style}
        className={tableCellClasses}
        ref={this.cellRef}
        {...restProps}
      >
        <div className={classes.container}>
          {children}
        </div>
        {resizingEnabled && (
          <ResizingControl
            onWidthChange={onWidthChange}
            onWidthDraft={onWidthDraft}
            onWidthDraftCancel={onWidthDraftCancel}
            resizeLastHandleClass={classes.resizeHandle}
            resizeHandleOpacityClass={classes.resizeHandleLine}
          />
        )}
      </TableCell>
    );

    return draggingEnabled ? (
      <DragSource
        ref={this.dragRef}
        payload={[{ type: 'column', columnName: column.name }]}
        onStart={this.onDragStart}
        onEnd={this.onDragEnd}
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
  draggingEnabled: PropTypes.bool,
  resizingEnabled: PropTypes.bool,
  onWidthChange: PropTypes.func,
  onWidthDraft: PropTypes.func,
  onWidthDraftCancel: PropTypes.func,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
  getCellWidth: PropTypes.func,
  isFixed: PropTypes.bool,
};

TableHeaderCellBase.defaultProps = {
  column: undefined,
  tableColumn: undefined,
  tableRow: undefined,
  style: null,
  draggingEnabled: false,
  resizingEnabled: false,
  onWidthChange: undefined,
  onWidthDraft: undefined,
  onWidthDraftCancel: undefined,
  className: undefined,
  children: undefined,
  getCellWidth: () => {},
  isFixed: true,
};

export const TableHeaderCell = withStyles(styles, { name: 'TableHeaderCell' })(TableHeaderCellBase);
