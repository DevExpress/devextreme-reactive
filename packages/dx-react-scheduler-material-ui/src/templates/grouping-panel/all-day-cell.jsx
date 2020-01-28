import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import TableCell from '@material-ui/core/TableCell';
import { makeStyles } from '@material-ui/core/styles';
import { getBorder } from '../utils';
import { GROUPING_PANEL_VERTICAL_CELL_WIDTH } from '../constants';

const useStyles = makeStyles(theme => ({
  cell: {
    userSelect: 'none',
    padding: 0,
    paddingTop: theme.spacing(0.5),
    boxSizing: 'border-box',
    borderRight: ({ hasBrightBorder }) => (
      hasBrightBorder ? getBorder(theme) : getBorder(theme)
    ),
    '&:last-child': {
      borderRight: 'none',
      width: '100%',
    },
    height: ({ height, timeTableCellHeight }) => (
      height ? theme.spacing((timeTableCellHeight * height) / 8) : undefined
    ),
    width: theme.spacing(GROUPING_PANEL_VERTICAL_CELL_WIDTH),
    minWidth: theme.spacing(GROUPING_PANEL_VERTICAL_CELL_WIDTH),
    maxWidth: theme.spacing(GROUPING_PANEL_VERTICAL_CELL_WIDTH),
  },
  text: {
    ...theme.typography.caption,
    padding: theme.spacing(1),
    paddingTop: 0,
    paddingBottom: 0,
    color: theme.palette.text.secondary,
    display: 'inline-block',
    lineHeight: 1.5,
    maxHeight: ({ height, timeTableCellHeight }) => (
      height ? theme.spacing((timeTableCellHeight * height) / 8 - 2) : undefined
    ),
    width: '100%',
    whiteSpace: 'pre-wrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    boxSizing: 'border-box',
  },
  verticalCell: ({ rowSpan }) => ({
    borderBottom: getBorder(theme),
    [`tr:nth-last-child(${rowSpan}) &`]: {
      borderBottom: 'none',
    },
  }),
}));

export const AllDayCell = React.memo(({
  className,
  group,
  rowSpan,
  hasBrightBorder,
  children,
  height,
  timeTableCellHeight,
  ...restProps
}) => {
  const classes = useStyles({
    hasBrightBorder, height, timeTableCellHeight, rowSpan,
  });
  return (
    <TableCell
      className={classNames({
        [classes.cell]: true,
        [classes.verticalCell]: true,
      }, className)}
      rowSpan={rowSpan}
      {...restProps}
    >
      <div className={classes.text}>
        {group.text}
        {children}
      </div>
    </TableCell>
  );
});

AllDayCell.propTypes = {
  className: PropTypes.string,
  group: PropTypes.object.isRequired,
  rowSpan: PropTypes.number,
  height: PropTypes.number,
  timeTableCellHeight: PropTypes.number,
  hasBrightBorder: PropTypes.bool,
  children: PropTypes.node,
};

AllDayCell.defaultProps = {
  className: undefined,
  hasBrightBorder: true,
  rowSpan: 1,
  height: undefined,
  timeTableCellHeight: 48,
  children: null,
};
