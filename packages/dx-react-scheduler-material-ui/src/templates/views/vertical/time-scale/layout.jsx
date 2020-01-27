import * as React from 'react';
import * as PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { HORIZONTAL_GROUP_ORIENTATION, VERTICAL_GROUP_ORIENTATION } from '@devexpress/dx-scheduler-core';
import { TicksLayout } from './ticks-layout';

const getLabelsForSingleGroup = (cellsData, groupIndex, groupHeight) => {
  const currentGroupIndex = groupIndex * groupHeight;
  const nextGroupIndex = currentGroupIndex + groupHeight;

  return cellsData.slice(currentGroupIndex, nextGroupIndex - 1).reduce((acc, days) => (([
    ...acc,
    {
      startDate: days[0].startDate,
      endDate: days[0].endDate,
      key: days[0].endDate,
      groupingInfo: days[0].groupingInfo,
    },
  ])), []);
};

const getLabelsForAllGroups = (cellsData, groupsNumber, singleGroupHeight) => {
  let labels = [];
  for (let i = 0; i < groupsNumber; i += 1) {
    labels = [
      ...labels,
      getLabelsForSingleGroup(cellsData, i, singleGroupHeight),
    ];
  }
  return labels;
};

const styles = ({ spacing }) => ({
  timeScaleContainer: {
    width: `calc(100% - ${spacing(1)}px)`,
  },
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
  groupOrientation,
  groups,
  classes,
  ...restProps
}) => {
  const groupsNumber = groups[groups.length - 1].length;
  const singleGroupHeight = cellsData.length / groupsNumber;
  return (
    <Grid container direction="row" {...restProps}>
      <div className={classes.timeScaleContainer}>
        {getLabelsForAllGroups(cellsData, groupsNumber, singleGroupHeight).map(
          (groupedLabels) => {
            const firstDataLabel = groupedLabels[0];
            const lastDataLabel = groupedLabels[groupedLabels.length - 1];
            return (
              <>
                <Label
                  key={firstDataLabel.startDate}
                  groupingInfo={firstDataLabel.groupingInfo}
                />
                {groupedLabels.map((label, index) => (
                  index !== cellsData.length - 1 && (
                    <Label
                      time={label.endDate}
                      formatDate={formatDate}
                      key={label.endDate}
                      groupingInfo={label.groupingInfo}
                    />
                  )
                ))}
                <Label
                  key={lastDataLabel.endDate}
                  groupingInfo={lastDataLabel.groupingInfo}
                  endOfGroup
                />
              </>
            );
          }
        )}
        {/* <Label key={cellsData[0][0].startDate} />
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
        /> */}
      </div>
      <TicksLayout
        rowComponent={rowComponent}
        cellComponent={tickCellComponent}
        cellsData={cellsData}
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
  groupOrientation: PropTypes.oneOf([HORIZONTAL_GROUP_ORIENTATION, VERTICAL_GROUP_ORIENTATION]),
  classes: PropTypes.object.isRequired,
};

LayoutBase.defaultProps = {
  groups: [[{}]],
  groupOrientation: HORIZONTAL_GROUP_ORIENTATION,
};

export const Layout = withStyles(styles, { name: 'Layout' })(LayoutBase);
