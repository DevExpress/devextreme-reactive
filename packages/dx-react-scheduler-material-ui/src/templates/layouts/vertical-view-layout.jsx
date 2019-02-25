import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  container: {
    overflowY: 'auto',
    height: 700,
  },
  stickyHeader: {
    top: 0,
    zIndex: 1,
    tableLayout: 'fixed',
    position: 'sticky',
    overflow: 'visible',
    background: theme.palette.background.paper,
  },
  timeTable: {
    position: 'relative',
  },
});

export class VerticalViewLayoutBase extends React.PureComponent {
  render() {
    const {
      timeScaleComponent: TimeScale,
      dayScaleComponent: DayScale,
      timeTableComponent: TimeTable,
      dayScaleEmptyCellComponent: DayScaleEmptyCell,
      classes,
    } = this.props;

    return (
      <Grid
        container
        className={classNames(classes.container, 'dx-layout')}
      >
        <Grid
          container
          direction="row"
          className={classNames(classes.stickyHeader, 'dx-layout-header')}
        >
          <Grid item xs={1} className={classes.emptySpace}>
            <DayScaleEmptyCell />
          </Grid>

          <Grid item xs={11}>
            <DayScale />
          </Grid>
        </Grid>

        <Grid container direction="row">
          <Grid item xs={1}>
            <TimeScale />
          </Grid>

          <Grid item xs={11} className={classNames(classes.timeTable, 'dx-time-table')}>
            <TimeTable />
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

VerticalViewLayoutBase.propTypes = {
  timeScaleComponent: PropTypes.func.isRequired,
  dayScaleComponent: PropTypes.func.isRequired,
  timeTableComponent: PropTypes.func.isRequired,
  dayScaleEmptyCellComponent: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export const VerticalViewLayout = withStyles(styles, { name: 'VerticalViewLayout' })(VerticalViewLayoutBase);
