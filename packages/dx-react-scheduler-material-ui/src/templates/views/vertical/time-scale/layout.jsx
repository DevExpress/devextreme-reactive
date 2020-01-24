import * as React from 'react';
import * as PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { TicksLayout } from './ticks-layout';
import { HORIZONTAL_GROUP_ORIENTATION, VERTICAL_GROUP_ORIENTATION } from '@devexpress/dx-scheduler-core';

const getLabelsForSingleGroup = (cellsData, groupIndex, groupHeight) => {
  const currentGroupIndex = groupIndex * groupHeight;
  const nextGroupIndex = currentGroupIndex + groupHeight;
  const firstCell = cellsData[currentGroupIndex][0];

  const labels = [
    {
      key: firstCell.startDate,
      groupingInfo: firstCell.groupingInfo,
    },
    ...cellsData.slice(currentGroupIndex, nextGroupIndex - 1).reduce((acc, days) => (([
      ...acc,
      {
        time: days[0].endDate,
        key: days[0].endDate,
        groupingInfo: days[0].groupingInfo,
      },
    ])), []),
    {
      key: cellsData[nextGroupIndex - 1][0].endDate,
      endOfGroup: true,
      groupingInfo: firstCell.groupingInfo,
    },
  ];
  return labels;
};

const getLabelsForAllGroups = (cellsData, groupsNumber, groupHeight) => {
  let labels = [];
  for (let i = 0; i < groupsNumber; i += 1) {
    labels = [
      ...labels,
      ...getLabelsForSingleGroup(cellsData, i, groupHeight),
    ];
  }
  return labels;
};

const styles = ({ spacing }) => ({
  timeScaleContainer: {
    width: `calc(100% - ${spacing(1)}px)`,
  },
  // timeScale: {}
  ticks: {
    width: spacing(1),
  },
});

const LayoutBase = ({
  labelComponent: Label,
  rowComponent,
  tickCellComponent,
  cellsData,
  formatDate,
  groups,
  groupOrientation,
  classes,
  ...restProps
}) => {
  return (
    <Grid container direction="row" {...restProps}>
      <div className={classes.timeScaleContainer}>
        {groups[groups.length - 1].map(() => {
          return (
            <>
              <div className={classes.timeScale}>
                <Label key={cellsData[0][0].startDate} />
                {cellsData.map((days, index) => (
                  index !== cellsData.length - 1 && (
                    <Label
                      time={days[0].endDate}
                      formatDate={formatDate}
                      key={days[0].endDate}
                      groupingInfo={days[0].groupingInfo}
                    />
                  )
                ))}
                <Label
                  key={cellsData[cellsData.length - 1][0].endDate}
                  endOfGroup
                />
              </div>
            </>
          );
        })}
      </div>
      <TicksLayout
        rowComponent={rowComponent}
        cellComponent={tickCellComponent}
        cellsData={[...cellsData, ...cellsData, ...cellsData, ...cellsData]}
        className={classes.ticks}
      />
    </Grid>
  );
};

LayoutBase.propTypes = {
  cellsData: PropTypes.arrayOf(Array).isRequired,
  labelComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  rowComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  tickCellComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  formatDate: PropTypes.func.isRequired,
  groups: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)),
  groupOrientation: PropTypes.anyOf([HORIZONTAL_GROUP_ORIENTATION, VERTICAL_GROUP_ORIENTATION]),
  classes: PropTypes.object.isRequired,
};

LayoutBase.defaultProps = {
  groups: [[{}]],
  groupOrientation: HORIZONTAL_GROUP_ORIENTATION,
};

export const Layout = withStyles(styles, { name: 'Layout' })(LayoutBase);
