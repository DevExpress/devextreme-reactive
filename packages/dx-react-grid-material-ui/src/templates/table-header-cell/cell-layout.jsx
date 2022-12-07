import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'clsx';

import { TableCell, styled } from '@mui/material';

import { ResizingControl } from './resizing-control';

const PREFIX = 'CellLayout';
export const classes = {
  cell: `${PREFIX}-cell`,
  cellRight: `${PREFIX}-cellRight`,
  cellCenter: `${PREFIX}-cellCenter`,
  cellNoWrap: `${PREFIX}-cellNoWrap`,
  cellNoUserSelect: `${PREFIX}-cellNoUserSelect`,
  cellDraggable: `${PREFIX}-cellDraggable`,
  cellDimmed: `${PREFIX}-cellDimmed`,
  container: `${PREFIX}-container`,
  resizeHandle: `${PREFIX}-resizeHandle`,
  resizeHandleLine: `${PREFIX}-resizeHandleLine`,
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${classes.cell}`]: {
    outline: 'none',
    position: 'relative',
    overflow: 'visible',
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    '&:first-of-type': {
      paddingLeft: theme.spacing(3),
    },
    '&:hover': {
      [`& .${classes.resizeHandleLine}`]: {
        opacity: 1,
      },
    },
    '&:nth-last-of-type(2)': {
      [`& .${classes.resizeHandle}`]: {
        width: theme.spacing(1),
        right: '1px',
      },
    },
  },
  [`&.${classes.cellRight}`]: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    textAlign: 'right',
  },
  [`&.${classes.cellCenter}`]: {
    textAlign: 'center',
  },
  [`&.${classes.cellNoWrap}`]: {
    whiteSpace: 'nowrap',
  },
  [`&.${classes.cellNoUserSelect}`]: {
    userSelect: 'none',
    MozUserSelect: 'none',
    WebkitUserSelect: 'none',
  },
  [`&.${classes.cellDraggable}`]: {
    cursor: 'pointer',
  },
  [`&.${classes.cellDimmed}`]: {
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
  [`& .${classes.container}`]: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  [`& .${classes.resizeHandle}`]: {},
  [`& .${classes.resizeHandleLine}`]: {
    opacity: 0,
  },
  '@media (pointer: fine)': {
    [`& .${classes.resizeHandleLine}`]: {
      opacity: 0,
    },
    [`& .${classes.resizeHandle}`]: {
      '&:hover': {
        [`& .${classes.resizeHandleLine}`]: {
          opacity: 1,
        },
      },
    },
  },
}));

export const CellLayout = ({
  style, column, tableColumn,
  draggingEnabled, resizingEnabled, dragging,
  onWidthChange, onWidthDraft, onWidthDraftCancel, getCellWidth,
  tableRow, className, children, forwardedRef,
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
    <StyledTableCell
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
    </StyledTableCell>
  );
};

CellLayout.propTypes = {
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
  className: PropTypes.string,
  children: PropTypes.node,
  getCellWidth: PropTypes.func,
  forwardedRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

CellLayout.defaultProps = {
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
