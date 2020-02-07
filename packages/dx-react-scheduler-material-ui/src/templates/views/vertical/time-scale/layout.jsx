import * as React from 'react';
import * as PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import {
  getLabelsForAllGroups,
  HORIZONTAL_GROUP_ORIENTATION, VERTICAL_GROUP_ORIENTATION,
} from '@devexpress/dx-scheduler-core';
import { TicksLayout } from './ticks-layout';

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
}) => (
  <Grid container direction="row" {...restProps}>
    <div className={classes.timeScaleContainer}>
      {getLabelsForAllGroups(cellsData, groups, groupOrientation).map(
        (groupedLabels, groupIndex) => {
          const firstDataLabel = groupedLabels[0];
          const lastDataLabel = groupedLabels[groupedLabels.length - 1];
          return (
            <React.Fragment key={groupIndex.toString()}>
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
                endOfGroup
              />
            </React.Fragment>
          );
        },
      )}
    </div>
    <TicksLayout
      rowComponent={rowComponent}
      cellComponent={tickCellComponent}
      cellsData={cellsData}
      className={classes.ticks}
      groupOrientation={groupOrientation}
    />
  </Grid>
);

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
