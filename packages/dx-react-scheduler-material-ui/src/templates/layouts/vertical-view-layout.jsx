import * as React from 'react';
import * as PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import RootRef from '@material-ui/core/RootRef';
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
      layoutRef,
      layoutHeaderRef,
    } = this.props;

    return (
      <RootRef rootRef={layoutRef}>
        <Grid
          container
          className={classes.container}
        >
          <RootRef rootRef={layoutHeaderRef}>
            <Grid
              container
              direction="row"
              className={classes.stickyHeader}
            >
              <Grid item xs={1} className={classes.emptySpace}>
                <DayScaleEmptyCell />
              </Grid>

              <Grid item xs={11}>
                <DayScale />
              </Grid>
            </Grid>
          </RootRef>

          <Grid container direction="row">
            <Grid item xs={1}>
              <TimeScale />
            </Grid>

            <Grid item xs={11} className={classes.timeTable}>
              <TimeTable />
            </Grid>
          </Grid>
        </Grid>
      </RootRef>
    );
  }
}

VerticalViewLayoutBase.propTypes = {
  timeScaleComponent: PropTypes.func.isRequired,
  dayScaleComponent: PropTypes.func.isRequired,
  timeTableComponent: PropTypes.func.isRequired,
  dayScaleEmptyCellComponent: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  layoutRef: PropTypes.object.isRequired,
  layoutHeaderRef: PropTypes.object.isRequired,
};

export const VerticalViewLayout = withStyles(styles, { name: 'VerticalViewLayout' })(VerticalViewLayoutBase);
