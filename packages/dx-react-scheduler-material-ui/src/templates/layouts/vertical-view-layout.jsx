import * as React from 'react';
import * as PropTypes from 'prop-types';
import { AUTO_HEIGHT } from '@devexpress/dx-scheduler-core';
import Grid from '@material-ui/core/Grid';
import RootRef from '@material-ui/core/RootRef';
import { withStyles } from '@material-ui/core/styles';
import { scrollingStrategy } from '../utils';

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

class VerticalViewLayoutBase extends React.PureComponent {
  constructor(props) {
    super(props);

    this.layout = React.createRef();
    this.layoutHeader = React.createRef();
  }

  componentDidMount() {
    const { setScrollingStrategy } = this.props;

    setScrollingStrategy(scrollingStrategy(this.layout.current, this.layoutHeader.current));
  }

  componentDidUpdate() {
    const { setScrollingStrategy } = this.props;

    setScrollingStrategy(scrollingStrategy(this.layout.current, this.layoutHeader.current));
  }

  render() {
    const {
      timeScaleComponent: TimeScale,
      dayScaleComponent: DayScale,
      timeTableComponent: TimeTable,
      dayScaleEmptyCellComponent: DayScaleEmptyCell,
      classes,
      height,
    } = this.props;

    const containerStyle = height === AUTO_HEIGHT ? { height: '100%' } : { height: `${height}px` };

    return (
      <RootRef rootRef={this.layout}>
        <Grid
          container
          className={classes.container}
          direction="column"
          wrap="nowrap"
          style={containerStyle}
        >
          <Grid item xs="auto" className={classes.stickyHeader}>
            <RootRef rootRef={this.layoutHeader}>
              <Grid
                container
                direction="row"
              >
                <Grid item xs={1} className={classes.emptySpace}>
                  <DayScaleEmptyCell />
                </Grid>

                <Grid item xs={11}>
                  <DayScale />
                </Grid>
              </Grid>
            </RootRef>
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
      </RootRef>
    );
  }
}

VerticalViewLayoutBase.propTypes = {
  timeScaleComponent: PropTypes.func.isRequired,
  dayScaleComponent: PropTypes.func.isRequired,
  timeTableComponent: PropTypes.func.isRequired,
  dayScaleEmptyCellComponent: PropTypes.func.isRequired,
  setScrollingStrategy: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export const VerticalViewLayout = withStyles(styles, { name: 'VerticalViewLayout' })(VerticalViewLayoutBase);
