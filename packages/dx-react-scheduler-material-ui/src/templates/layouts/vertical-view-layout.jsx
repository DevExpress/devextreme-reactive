import * as React from 'react';
import * as PropTypes from 'prop-types';
import { AUTO_HEIGHT } from '@devexpress/dx-scheduler-core';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const styles = theme => ({
  container: {
    overflowY: 'auto',
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
      height,
      className,
      style,
      ...restProps
    } = this.props;

    const containerStyle = height === AUTO_HEIGHT ? { height: '100%' } : { height: `${height}px` };
    return (
      <Grid
        container
        className={classNames(classes.container, className)}
        direction="column"
        wrap="nowrap"
        style={{ containerStyle, ...style }}
        ref={layoutRef}
        {...restProps}
      >
        <Grid item xs="auto" className={classes.stickyHeader}>
          <Grid
            container
            direction="row"
            ref={layoutHeaderRef}
          >
            <Grid item xs={1} className={classes.emptySpace}>
              <DayScaleEmptyCell />
            </Grid>

            <Grid item xs={11}>
              <DayScale />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs="auto">
          <Grid container direction="row">
            <Grid item xs={1}>
              <TimeScale />
            </Grid>

            <Grid item xs={11} className={classes.timeTable}>
              <TimeTable />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

VerticalViewLayoutBase.propTypes = {
  // oneOfType is a workaround because withStyles returns react object
  timeScaleComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  dayScaleComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  timeTableComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  dayScaleEmptyCellComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  classes: PropTypes.object.isRequired,
  layoutRef: PropTypes.object.isRequired,
  layoutHeaderRef: PropTypes.object.isRequired,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
};

VerticalViewLayoutBase.defaultProps = {
  className: undefined,
  style: undefined,
};

export const VerticalViewLayout = withStyles(styles, { name: 'VerticalViewLayout' })(VerticalViewLayoutBase);
