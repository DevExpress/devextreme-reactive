import * as React from 'react';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import classNames from 'clsx';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import {
  getLabelsForAllGroups, getGroupsLastRow, VIEW_TYPES,
  HORIZONTAL_GROUP_ORIENTATION, VERTICAL_GROUP_ORIENTATION,
} from '@devexpress/dx-scheduler-core';
import { TicksLayout } from './ticks-layout';
import { getBrightBorder } from '../../../utils';
import { SPACING_CELL_HEIGHT, LEFT_PANEL_WIDTH_SPACING } from '../../../constants';

const PREFIX = 'Layout';

export const classes = {
  timeScaleContainer: `${PREFIX}-timeScaleContainer`,
  ticks: `${PREFIX}-ticks`,
  cell: `${PREFIX}-cell`,
  verticalCell: `${PREFIX}-verticalCell`,
  flexRow: `${PREFIX}-flexRow`,
};

const StyledDiv = styled('div', {
  shouldForwardProp: prop => prop !== 'height' && prop !== 'defaultHeight',
})(({ theme, height, defaultHeight }) => ({
  [`& .${classes.timeScaleContainer}`]: {
    width: theme.spacing(LEFT_PANEL_WIDTH_SPACING - 1),
  },
  [`& .${classes.ticks}`]: {
    width: theme.spacing(1),
  },
  [`& .${classes.cell}`]: {
    boxSizing: 'border-box',
    padding: 0,
    borderBottom: 'none',
  },
  [`& .${classes.verticalCell}`]: {
    borderBottom: getBrightBorder(theme),
    'tr:last-child &': {
      borderBottom: 'none',
    },
    height: height ? `${height}px` : theme.spacing(defaultHeight),
  },
  [`&.${classes.flexRow}`]: {
    display: 'flex',
    flexDirection: 'row',
  },
}));

export const Layout = ({
  labelComponent: Label,
  rowComponent,
  tickCellComponent,
  allDayTitleComponent: AllDayTitle,
  cellsData,
  formatDate,
  groupOrientation,
  groups,
  showAllDayTitle,
  height,
  className,
  ...restProps
}) => {
  const groupCount = getGroupsLastRow(groups).length;
  const cellsCount = cellsData.length / groupCount;
  const heightWithoutAllDayTitle = SPACING_CELL_HEIGHT[VIEW_TYPES.WEEK] * cellsCount;
  const defaultHeight = showAllDayTitle
    ? heightWithoutAllDayTitle + SPACING_CELL_HEIGHT[VIEW_TYPES.ALL_DAY_PANEL]
    : heightWithoutAllDayTitle;
  const calculatedHeight = height / groupCount;

  return (
    <StyledDiv
      height={calculatedHeight}
      defaultHeight={defaultHeight}
      className={classNames(classes.flexRow, className)}
      {...restProps}
    >
      <Table className={classes.timeScaleContainer}>
        <TableBody>
          {getLabelsForAllGroups(cellsData, groups, groupOrientation).map(
            (groupedLabels, groupIndex) => {
              const firstDataLabel = groupedLabels[0];
              const lastDataLabel = groupedLabels[groupedLabels.length - 1];
              return (
                <TableRow key={groupIndex.toString()}>
                  <TableCell
                    className={classNames({
                      [classes.cell]: true,
                      [classes.verticalCell]: groupOrientation === VERTICAL_GROUP_ORIENTATION,
                    })}
                  >
                    <AllDayTitle fixedHeight />
                    <Label
                      key={firstDataLabel.startDate}
                      groupingInfo={firstDataLabel.groupingInfo}
                    />
                    {groupedLabels.map((label, index) => (
                      index !== cellsData.length - 1 && (
                        <Label
                          time={label.endDate}
                          formatDate={formatDate}
                          key={label.key}
                          groupingInfo={label.groupingInfo}
                        />
                      )
                    ))}
                    <Label
                      key={lastDataLabel.endDate}
                      groupingInfo={lastDataLabel.groupingInfo}
                    />
                  </TableCell>
                </TableRow>
              );
            },
          )}
        </TableBody>
      </Table>
      <TicksLayout
        rowComponent={rowComponent}
        cellComponent={tickCellComponent}
        cellsData={cellsData}
        className={classes.ticks}
        groupOrientation={groupOrientation}
        groupCount={groupCount}
        includeAllDayCell={showAllDayTitle}
      />
    </StyledDiv>
  );
};

Layout.propTypes = {
  cellsData: PropTypes.arrayOf(Array).isRequired,
  labelComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  rowComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  allDayTitleComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  tickCellComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  formatDate: PropTypes.func.isRequired,
  groups: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)),
  groupOrientation: PropTypes.oneOf([HORIZONTAL_GROUP_ORIENTATION, VERTICAL_GROUP_ORIENTATION]),
  showAllDayTitle: PropTypes.bool,
  height: PropTypes.number,
  className: PropTypes.string,
};

Layout.defaultProps = {
  groups: [[{}]],
  groupOrientation: HORIZONTAL_GROUP_ORIENTATION,
  allDayTitleComponent: () => null,
  showAllDayTitle: false,
  height: 0,
  className: undefined,
};
