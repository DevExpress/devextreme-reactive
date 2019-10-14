import * as React from 'react';
import * as PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'clsx';
import { scrollingStrategy } from '../utils';

const styles = theme => ({
  container: {
    overflowY: 'auto',
    position: 'relative',
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
    this.setScrollingStrategy();
  }

  componentDidUpdate() {
    this.setScrollingStrategy();
  }

  setScrollingStrategy() {
    const { setScrollingStrategy } = this.props;

    setScrollingStrategy(scrollingStrategy(this.layout.current, this.layoutHeader.current));
  }

  render() {
    const {
      timeScaleComponent: TimeScale,
      dayScaleComponent: DayScale,
      timeTableComponent: TimeTable,
      dayScaleEmptyCellComponent: DayScaleEmptyCell,
      setScrollingStrategy,
      classes,
      className,
      ...restProps
    } = this.props;

    return (
      <Grid
        ref={this.layout}
        container
        className={classNames(classes.container, className)}
        direction="column"
        wrap="nowrap"
        {...restProps}
      >
        {/* Fix Safari sticky header https://bugs.webkit.org/show_bug.cgi?id=175029 */}
        <div>
          <Grid item xs="auto" className={classes.stickyHeader}>
            <Grid
              ref={this.layoutHeader}
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
        </div>
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
  setScrollingStrategy: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

VerticalViewLayoutBase.defaultProps = {
  className: undefined,
};

export const VerticalViewLayout = withStyles(styles, { name: 'VerticalViewLayout' })(VerticalViewLayoutBase);
