import * as React from 'react';
import * as PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { makeStyles } from '@material-ui/core/styles';
import {
  getLabelsForAllGroups, getGroupsLastRow, VIEW_TYPES,
  HORIZONTAL_GROUP_ORIENTATION, VERTICAL_GROUP_ORIENTATION,
} from '@devexpress/dx-scheduler-core';
import { TicksLayout } from './ticks-layout';
import { getBrightBorder } from '../../../utils';
import { SPACING_CELL_HEIGHT } from '../../../constants';

const useStyles = makeStyles(theme => ({
  timeScaleContainer: {
    width: `calc(100% - ${theme.spacing(1)}px)`,
  },
  ticks: {
    width: theme.spacing(1),
  },
  cell: {
    borderBottom: getBrightBorder(theme),
    boxSizing: 'border-box',
    padding: 0,
    'tr:last-child &': {
      borderBottom: 'none',
    },
    height: ({ height, defaultHeight }) => (
      height ? `${height}px` : `${theme.spacing(defaultHeight)}px`
    ),
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
  ...restProps
}) => {
  const groupCount = getGroupsLastRow(groups).length;
  const cellsCount = cellsData.length / groupCount;
  const heightWithoutAllDayTitle = SPACING_CELL_HEIGHT[VIEW_TYPES.WEEK] * cellsCount;
  const defaultHeight = showAllDayTitle
    ? heightWithoutAllDayTitle + SPACING_CELL_HEIGHT[VIEW_TYPES.ALL_DAY_PANEL]
    : heightWithoutAllDayTitle;

  const classes = useStyles({ height: height / groupCount, defaultHeight });

  return (
    <Grid container direction="row" {...restProps}>
      <Table className={classes.timeScaleContainer}>
        <TableBody>
          {getLabelsForAllGroups(cellsData, groups, groupOrientation).map(
            (groupedLabels, groupIndex) => {
              const firstDataLabel = groupedLabels[0];
              const lastDataLabel = groupedLabels[groupedLabels.length - 1];
              return (
                <TableRow key={groupIndex.toString()}>
                  <TableCell className={classes.cell}>
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
    </Grid>
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
};

Layout.defaultProps = {
  groups: [[{}]],
  groupOrientation: HORIZONTAL_GROUP_ORIENTATION,
  allDayTitleComponent: () => null,
  showAllDayTitle: false,
  height: 0,
};
