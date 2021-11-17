import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import TableCell from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import { HORIZONTAL_GROUP_ORIENTATION, VERTICAL_GROUP_ORIENTATION } from '@devexpress/dx-scheduler-core';
import { getBrightBorder, getBorder } from '../utils';
import { GROUPING_PANEL_VERTICAL_CELL_WIDTH, DEFAULT_SPACING } from '../constants';

const PREFIX = 'Cell';

export const classes = {
  cell: `${PREFIX}-cell`,
  text: `${PREFIX}-text`,
  horizontalCell: `${PREFIX}-horizontalCell`,
  content: `${PREFIX}-content`,
  verticalCell: `${PREFIX}-verticalCell`,
  groupedByDate: `${PREFIX}-groupedByDate`,
  verticalCellText: `${PREFIX}-title`,
  textContainer: `${PREFIX}-title`,
};

const StyledTableCell = styled(TableCell, {
  shouldForwardProp: prop => prop !== 'endOfGroup' && prop !== 'textStyle' && prop !== 'topOffset',
})(({
  theme, left, endOfGroup, height, rowSpan, textStyle, topOffset,
}) => ({
  [`&.${classes.cell}`]: {
    userSelect: 'none',
    padding: 0,
    paddingTop: theme.spacing(0.5),
    boxSizing: 'border-box',
    borderRight: getBrightBorder(theme),
    '&:last-child': {
      borderRight: 'none',
    },
    height: height ? theme.spacing(height) : undefined,
  },
  [`& .${classes.text}`]: {
    ...theme.typography.caption,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
    fontWeight: 'bold',
    fontSize: '1rem',
    position: 'sticky',
    display: 'inline-block',
    left: `${left}px`,
    lineHeight: 1.5,
    whiteSpace: 'pre-wrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    boxSizing: 'border-box',
    ...textStyle,
  },
  [`&.${classes.horizontalCell}`]: {
    borderBottom: 'none',
    borderTop: getBrightBorder(theme),
    'tr:first-of-type &': {
      borderTop: 'none',
    },
  },
  [`&.${classes.verticalCell}`]: {
    borderBottom: getBrightBorder(theme),
    [`tr:nth-last-of-type(${rowSpan}) &`]: {
      borderBottom: 'none',
    },
    verticalAlign: 'top',
    paddingTop: 0,
    width: theme.spacing(GROUPING_PANEL_VERTICAL_CELL_WIDTH),
    minWidth: theme.spacing(GROUPING_PANEL_VERTICAL_CELL_WIDTH),
    maxWidth: theme.spacing(GROUPING_PANEL_VERTICAL_CELL_WIDTH),
    maxHeight: height ? theme.spacing(height - 2) : undefined,
  },
  [`&.${classes.groupedByDate}`]: {
    borderRight: endOfGroup
      ? getBrightBorder(theme) : getBorder(theme),
    borderTop: getBorder(theme),
  },
  [`& .${classes.verticalCellText}`]: {
    top: `${topOffset}px`,
    width: '100%',
  },
  [`& .${classes.textContainer}`]: {
    height: '100%',
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
  const cellHeight = height / DEFAULT_SPACING;
  const isHorizontalGrouping = groupOrientation === HORIZONTAL_GROUP_ORIENTATION;
  const isVerticalGrouping = groupOrientation === VERTICAL_GROUP_ORIENTATION;

  return (
    <StyledTableCell
      left={left}
      endOfGroup={endOfGroup}
      height={cellHeight}
      textStyle={textStyle}
      topOffset={topOffset}
      className={classNames({
        [classes.cell]: true,
        [classes.horizontalCell]: isHorizontalGrouping,
        [classes.verticalCell]: isVerticalGrouping,
        [classes.groupedByDate]: groupedByDate && !isVerticalGrouping,
      }, className)}
      colSpan={colSpan}
      rowSpan={rowSpan}
      {...restProps}
    >
      {/* NOTE: for sticky text in Safari */}
      <div
        className={classNames({
          [classes.textContainer]: isVerticalGrouping,
        })}
      >
        <div
          className={classNames({
            [classes.text]: true,
            [classes.verticalCellText]: isVerticalGrouping,
          })}
        >
          {group.text}
          {children}
        </div>
      </div>
    </StyledTableCell>
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
  groupOrientation: PropTypes.oneOf([HORIZONTAL_GROUP_ORIENTATION, VERTICAL_GROUP_ORIENTATION]),
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
