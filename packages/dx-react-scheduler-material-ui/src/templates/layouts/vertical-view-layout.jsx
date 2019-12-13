import * as React from 'react';
import * as PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'clsx';
import { scrollingStrategy, getBorder, getBrightBorder } from '../utils';

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
    borderBottom: getBorder(theme),
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
    display: 'table',
  },
  background: {
    background: theme.palette.background.paper,
  },
  borderedCell: {
    borderRight: getBrightBorder(theme),
    boxSizing: 'border-box',
  },
  brightBorderHeader: {
    borderBottom: getBrightBorder(theme),
  },
});

class VerticalViewLayoutBase extends React.PureComponent {
  constructor(props) {
    super(props);

    this.layout = React.createRef();
    this.layoutHeader = React.createRef();
    this.timeScale = React.createRef();

    this.state = {
      isLeftBorderSet: false,
      isTopBorderSet: false,
    };

    this.setBorders = this.setBorders.bind(this);
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

  setBorders(event) {
    const { isLeftBorderSet, isTopBorderSet } = this.state;
    if ((!event.target.scrollLeft && isLeftBorderSet)
      || (event.target.scrollLeft && !isLeftBorderSet)) {
      this.setState({
        isLeftBorderSet: !isLeftBorderSet,
      });
    }
    if ((!event.target.scrollTop && isTopBorderSet)
        || (event.target.scrollTop && !isTopBorderSet)) {
      this.setState({
        isTopBorderSet: !isTopBorderSet,
      });
    }
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
    const { isLeftBorderSet, isTopBorderSet } = this.state;

    return (
      <Grid
        ref={this.layout}
        container
        className={classNames(classes.container, className)}
        direction="column"
        wrap="nowrap"
        onScroll={this.setBorders}
        {...restProps}
      >
        {/* Fix Safari sticky header https://bugs.webkit.org/show_bug.cgi?id=175029 */}
        <div>
          <Grid
            className={classNames({
              [classes.stickyElement]: true,
              [classes.header]: true,
              [classes.autoWidth]: true,
              [classes.brightBorderHeader]: isTopBorderSet,
            })}
          >
            <Grid
              ref={this.layoutHeader}
              container
              direction="row"
            >
              <div
                className={classNames({
                  [classes.fixedWidth]: true,
                  [classes.stickyElement]: true,
                  [classes.leftPanel]: true,
                  [classes.borderedCell]: isLeftBorderSet,
                })}
              >
                <DayScaleEmptyCell />
              </div>

              <div className={classes.mainTable}>
                <div className={classNames(classes.fullScreenContainer, classes.background)}>
                  <DayScale />
                </div>
              </div>
            </Grid>
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
