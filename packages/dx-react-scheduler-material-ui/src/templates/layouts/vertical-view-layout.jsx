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
  stickyElement: {
    tableLayout: 'fixed',
    position: 'sticky',
    overflow: 'visible',
    background: theme.palette.background.paper,
  },
  header: {
    top: 0,
    zIndex: 2,
  },
  leftPanel: {
    left: 0,
    zIndex: 1,
  },
  timeTable: {
    position: 'relative',
  },
  fixedWidth: {
    width: theme.spacing(10),
  },
  mainTable: {
    width: `calc(100% - ${theme.spacing(10)}px)`,
  },
  fullScreenContainer: {
    minWidth: '100%',
    display: 'table',
    position: 'relative',
  },
  autoWidth: {
    display: 'inline-block',
    width: 'auto',
  },
  background: {
    background: theme.palette.background.paper,
    width: `calc(100% + ${theme.spacing(10)}px)`,
  },
});

class VerticalViewLayoutBase extends React.PureComponent {
  constructor(props) {
    super(props);

    this.layout = React.createRef();
    this.layoutHeader = React.createRef();
    this.timeScale = React.createRef();
  }

  componentDidMount() {
    this.setScrollingStrategy();
  }

  componentDidUpdate() {
    this.setScrollingStrategy();
  }

  setScrollingStrategy() {
    const { setScrollingStrategy } = this.props;

    setScrollingStrategy(scrollingStrategy(
      this.layout.current, this.layoutHeader.current, this.timeScale.current,
    ));
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
          <Grid
            className={classNames(classes.stickyElement, classes.header, classes.autoWidth)}
          >
            <div className={classes.background}>
              <Grid
                ref={this.layoutHeader}
                container
                direction="row"
              >
                <div
                  className={classNames(
                    classes.fixedWidth, classes.stickyElement, classes.leftPanel,
                  )}
                >
                  <DayScaleEmptyCell />
                </div>

                <div className={classes.mainTable}>
                  <div className={classes.fullScreenContainer}>
                    <DayScale />
                  </div>
                </div>
              </Grid>
            </div>
          </Grid>

          <Grid className={classes.autoWidth}>
            <Grid container direction="row">
              <div
                ref={this.timeScale}
                className={classNames(
                  classes.fixedWidth, classes.stickyElement, classes.leftPanel,
                )}
              >
                <TimeScale />
              </div>
              <div className={classNames(classes.mainTable, classes.timeTable)}>
                <div className={classes.fullScreenContainer}>
                  <TimeTable />
                </div>
              </div>
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
