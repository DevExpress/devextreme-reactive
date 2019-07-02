import * as React from 'react';
import * as PropTypes from 'prop-types';
import { AUTO_HEIGHT } from '@devexpress/dx-scheduler-core';
import Grid from '@material-ui/core/Grid';
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

class HorizontalViewLayoutBase extends React.PureComponent {
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
      dayScaleComponent: DayScale,
      timeTableComponent: TimeTable,
      classes,
      height,
    } = this.props;

    const containerStyle = height === AUTO_HEIGHT ? { height: '100%' } : { height: `${height}px` };

    return (
      <Grid
        ref={this.layout}
        className={classes.container}
        container
        direction="column"
        wrap="nowrap"
        style={containerStyle}
      >
        <Grid
          ref={this.layoutHeader}
          item
          className={classes.stickyHeader}
        >
          <DayScale />
        </Grid>
        <Grid
          item
          className={classes.timeTable}
        >
          <TimeTable />
        </Grid>
      </Grid>
    );
  }
}

HorizontalViewLayoutBase.propTypes = {
  // oneOfType is a workaround because withStyles returns react object
  dayScaleComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  timeTableComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  setScrollingStrategy: PropTypes.func.isRequired,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  classes: PropTypes.object.isRequired,
};

export const HorizontalViewLayout = withStyles(styles, { name: 'HorizontalViewLayout' })(HorizontalViewLayoutBase);
