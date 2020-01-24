import * as React from 'react';
import * as PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'clsx';
import { scrollingStrategy, getBorder, getBrightBorder } from '../utils';
import { GROUPING_PANEL_VERTICAL_CELL_WIDTH } from '../constants';

const useStyles = makeStyles(theme => ({
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
    boxSizing: 'border-box',
    float: 'left',
    width: ({ groupingPanelSize }) => `${theme.spacing(10)
      + groupingPanelSize * GROUPING_PANEL_VERTICAL_CELL_WIDTH + 1}px`,
  },
  timeTable: {
    position: 'relative',
  },
  mainTable: {
    width: ({ groupingPanelSize }) => `calc(100% -
      ${theme.spacing(10) + groupingPanelSize * GROUPING_PANEL_VERTICAL_CELL_WIDTH + 1}px)`,
    float: 'right',
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
  ordinaryLeftPanelBorder: {
    borderRight: getBorder(theme),
  },
  brightLeftPanelBorder: {
    borderRight: getBrightBorder(theme),
  },
  ordinaryHeaderBorder: {
    borderBottom: getBorder(theme),
  },
  brightHeaderBorder: {
    borderBottom: getBrightBorder(theme),
  },
  timeScale: {
    width: theme.spacing(10),
  },
  dayScaleEmptyCell: {
    display: 'flex',
    alignItems: 'flex-end',
  },
}));

export const VerticalViewLayout = React.memo(({
  timeScaleComponent: TimeScale,
  dayScaleComponent: DayScale,
  timeTableComponent: TimeTable,
  dayScaleEmptyCellComponent: DayScaleEmptyCell,
  groupingPanelComponent: GroupingPanel,
  groupingPanelSize,
  setScrollingStrategy,
  className,
  ...restProps
}) => {
  const layoutRef = React.useRef(null);
  const layoutHeaderRef = React.useRef(null);
  const leftPanelRef = React.useRef(null);

  const [isLeftBorderSet, setIsLeftBorderSet] = React.useState(false);
  const [isTopBorderSet, setIsTopBorderSet] = React.useState(false);

  React.useEffect(() => {
    setScrollingStrategy(scrollingStrategy(
      layoutRef.current, layoutHeaderRef.current, leftPanelRef.current,
    ));
  }, [layoutRef, layoutHeaderRef, leftPanelRef]);

  const classes = useStyles({ groupingPanelSize });

  const setBorders = React.useCallback((event) => {
    // eslint-disable-next-line no-bitwise
    if ((!!event.target.scrollLeft ^ isLeftBorderSet)) {
      setIsLeftBorderSet(!isLeftBorderSet);
    }
    // eslint-disable-next-line no-bitwise
    if (!!event.target.scrollTop ^ isTopBorderSet) {
      setIsTopBorderSet(!isTopBorderSet);
    }
  }, [isLeftBorderSet, isTopBorderSet]);

  return (
    <Grid
      ref={layoutRef}
      container
      className={classNames(classes.container, className)}
      direction="column"
      wrap="nowrap"
      onScroll={setBorders}
      {...restProps}
    >
      {/* Fix Safari sticky header https://bugs.webkit.org/show_bug.cgi?id=175029 */}
      <div>
        <Grid
          className={classNames(classes.stickyElement, classes.header, classes.autoWidth)}
        >
          <Grid
            ref={layoutHeaderRef}
            container
            direction="row"
          >
            <div
              className={classNames({
                [classes.stickyElement]: true,
                [classes.leftPanel]: true,
                [classes.dayScaleEmptyCell]: true,
                [classes.ordinaryBorderLeftPanel]: !isLeftBorderSet,
                [classes.brightBorderLeftPanel]: isLeftBorderSet,
                [classes.ordinaryBorderHeader]: !isTopBorderSet,
                [classes.brightBorderHeader]: isTopBorderSet,
              })}
            >
              <DayScaleEmptyCell />
            </div>

            <div className={classes.mainTable}>
              <div
                className={classNames({
                  [classes.fixedWidth]: true,
                  [classes.stickyElement]: true,
                  [classes.leftPanel]: true,
                  [classes.ordinaryLeftPanelBorder]: !isLeftBorderSet,
                  [classes.brightLeftPanelBorder]: isLeftBorderSet,
                  [classes.ordinaryHeaderBorder]: !isTopBorderSet,
                  [classes.brightHeaderBorder]: isTopBorderSet,
                })}
              >
                <DayScaleEmptyCell />
              </div>

              <div className={classes.mainTable}>
                <div
                  className={classNames({
                    [classes.fullScreenContainer]: true,
                    [classes.background]: true,
                    [classes.ordinaryHeaderBorder]: !isTopBorderSet,
                    [classes.brightHeaderBorder]: isTopBorderSet,
                  })}
                >
                  <DayScale />
                </div>
              </div>
            </div>
          </Grid>
        </Grid>

        <Grid className={classes.autoWidth}>
          <Grid
            ref={leftPanelRef}
            container
            className={classNames({
              [classes.stickyElement]: true,
              [classes.leftPanel]: true,
              [classes.ordinaryBorderLeftPanel]: !isLeftBorderSet,
              [classes.brightBorderLeftPanel]: isLeftBorderSet,
            })}
          >
            <GroupingPanel />
            <div className={classes.timeScale}>
              <TimeScale />
            </div>
          </Grid>
          <div className={classNames(classes.mainTable, classes.timeTable)}>
            <div className={classes.fullScreenContainer}>
              <TimeTable />
            </div>
          </div>
        </Grid>
      </div>
    </Grid>
  );
});

VerticalViewLayout.propTypes = {
  // oneOfType is a workaround because withStyles returns react object
  timeScaleComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  dayScaleComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  timeTableComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  dayScaleEmptyCellComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  groupingPanelComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  groupingPanelSize: PropTypes.number,
  setScrollingStrategy: PropTypes.func.isRequired,
  // classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

VerticalViewLayout.defaultProps = {
  groupingPanelComponent: () => null,
  groupingPanelSize: 0,
  className: undefined,
};
