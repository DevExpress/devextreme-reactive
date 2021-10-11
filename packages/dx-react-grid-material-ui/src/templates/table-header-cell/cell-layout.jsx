import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';

import TableCell from '@mui/material/TableCell';
import withStyles from '@mui/styles/withStyles';

import { ResizingControl } from './resizing-control';

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
});

const CellLayoutBase = ({
  style, column, tableColumn,
  draggingEnabled, resizingEnabled, dragging,
  onWidthChange, onWidthDraft, onWidthDraftCancel, getCellWidth,
  classes, tableRow, className, children, forwardedRef,
  ...restProps
}) => {
  const cellRef = React.useRef();
  const getWidthGetter = React.useCallback(() => {
    const node = cellRef.current;
    return node && getCellWidth(() => {
      const { width } = node.getBoundingClientRect();
      return width;
    });
  });

  React.useEffect(() => {
    getWidthGetter();
  }, []);

  const align = (tableColumn && tableColumn.align) || 'left';
  return (
    <TableCell
      style={style}
      className={classNames({
        [classes.cell]: true,
        [classes.cellRight]: align === 'right',
        [classes.cellCenter]: align === 'center',
        [classes.cellNoUserSelect]: draggingEnabled,
        [classes.cellDraggable]: draggingEnabled,
        [classes.cellDimmed]: dragging || (tableColumn && tableColumn.draft),
        [classes.cellNoWrap]: !(tableColumn && tableColumn.wordWrapEnabled),
      }, className)}
      ref={(node) => {
        cellRef.current = node;
        if (typeof forwardedRef === 'function') {
          forwardedRef(node);
        } else if (forwardedRef) {
          // eslint-disable-next-line no-param-reassign
          forwardedRef.current = node;
        }
      }}
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
};

CellLayoutBase.propTypes = {
  tableColumn: PropTypes.object,
  tableRow: PropTypes.object,
  column: PropTypes.object,
  style: PropTypes.object,
  dragging: PropTypes.bool,
  draggingEnabled: PropTypes.bool,
  resizingEnabled: PropTypes.bool,
  onWidthChange: PropTypes.func,
  onWidthDraft: PropTypes.func,
  onWidthDraftCancel: PropTypes.func,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
  getCellWidth: PropTypes.func,
  forwardedRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

CellLayoutBase.defaultProps = {
  column: undefined,
  tableColumn: undefined,
  tableRow: undefined,
  style: null,
  dragging: false,
  draggingEnabled: false,
  resizingEnabled: false,
  onWidthChange: undefined,
  onWidthDraft: undefined,
  onWidthDraftCancel: undefined,
  className: undefined,
  children: undefined,
  getCellWidth: () => {},
  forwardedRef: undefined,
};

export const CellLayout = withStyles(styles, { name: 'CellLayout' })(CellLayoutBase);
