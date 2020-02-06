import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import TableCell from '@material-ui/core/TableCell';
import { makeStyles } from '@material-ui/core/styles';
import { HORIZONTAL_GROUP_ORIENTATION, VERTICAL_GROUP_ORIENTATION } from '@devexpress/dx-scheduler-core';
import { getBrightBorder, getBorder } from '../utils';
import { GROUPING_PANEL_VERTICAL_CELL_WIDTH } from '../constants';

const useStyles = makeStyles(theme => ({
  cell: {
    userSelect: 'none',
    padding: 0,
    paddingTop: theme.spacing(0.5),
    boxSizing: 'border-box',
    borderRight: getBrightBorder(theme),
    '&:last-child': {
      borderRight: 'none',
    },
    height: ({ height }) => (
      height ? theme.spacing(height) : undefined
    ),
  },
  text: ({
    textStyle, height, left,
  }) => ({
    ...theme.typography.caption,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
    fontWeight: 'bold',
    fontSize: '1rem',
    position: 'sticky',
    display: 'inline-block',
    left: `${left}px`,
    lineHeight: 1.5,
    maxHeight: height ? theme.spacing(height - 2) : undefined,
    whiteSpace: 'pre-wrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    boxSizing: 'border-box',
    ...textStyle,
  }),
  horizontalCell: {
    borderBottom: 'none',
    borderTop: getBrightBorder(theme),
    'tr:first-child &': {
      borderTop: 'none',
    },
  },
  verticalCell: ({ rowSpan }) => ({
    borderBottom: getBrightBorder(theme),
    [`tr:nth-last-child(${rowSpan}) &`]: {
      borderBottom: 'none',
    },
    verticalAlign: 'top',
    paddingTop: 0,
    width: theme.spacing(GROUPING_PANEL_VERTICAL_CELL_WIDTH),
    minWidth: theme.spacing(GROUPING_PANEL_VERTICAL_CELL_WIDTH),
    maxWidth: theme.spacing(GROUPING_PANEL_VERTICAL_CELL_WIDTH),
  }),
  groupedByDate: {
    borderRight: ({ endOfGroup }) => (endOfGroup
      ? getBrightBorder(theme) : getBorder(theme)),
    borderTop: getBorder(theme),
  },
  verticalCellText: {
    top: ({ topOffset }) => `${topOffset}px`,
    width: '100%',
  },
}));

export const Cell = React.memo(({
  className,
  group,
  colSpan,
  rowSpan,
  left,
  endOfGroup,
  groupedByDate,
  children,
  height,
  groupOrientation,
  textStyle,
  topOffset,
  ...restProps
}) => {
  const cellHeight = height / 8;
  const classes = useStyles({
    left, endOfGroup, height: cellHeight, rowSpan, textStyle, topOffset,
  });
  return (
    <TableCell
      className={classNames({
        [classes.cell]: true,
        [classes.horizontalCell]: groupOrientation === HORIZONTAL_GROUP_ORIENTATION,
        [classes.verticalCell]: groupOrientation === VERTICAL_GROUP_ORIENTATION,
        [classes.groupedByDate]: groupedByDate && groupOrientation !== VERTICAL_GROUP_ORIENTATION,
      }, className)}
      colSpan={colSpan}
      rowSpan={rowSpan}
      {...restProps}
    >
      <div
        className={classNames({
          [classes.text]: true,
          [classes.verticalCellText]: groupOrientation === VERTICAL_GROUP_ORIENTATION,
        })}
      >
        {group.text}
        {children}
      </div>
    </TableCell>
  );
});

Cell.propTypes = {
  className: PropTypes.string,
  group: PropTypes.object.isRequired,
  colSpan: PropTypes.number.isRequired,
  rowSpan: PropTypes.number,
  left: PropTypes.number.isRequired,
  endOfGroup: PropTypes.bool,
  groupedByDate: PropTypes.bool,
  height: PropTypes.number,
  groupOrientation: PropTypes.string,
  textStyle: PropTypes.object,
  topOffset: PropTypes.number,
  children: PropTypes.node,
};

Cell.defaultProps = {
  className: undefined,
  endOfGroup: true,
  rowSpan: 1,
  height: 48,
  groupOrientation: HORIZONTAL_GROUP_ORIENTATION,
  children: null,
  groupedByDate: true,
  textStyle: {},
  topOffset: undefined,
};
