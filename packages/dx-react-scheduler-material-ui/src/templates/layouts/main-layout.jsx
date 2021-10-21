import * as React from 'react';
import * as PropTypes from 'prop-types';
import makeStyles from '@mui/styles/makeStyles';
import classNames from 'clsx';
import { scrollingStrategy, getBorder, getBrightBorder } from '../utils';
import { GROUPING_PANEL_VERTICAL_CELL_WIDTH, LEFT_PANEL_WIDTH_SPACING } from '../constants';

const useStyles = makeStyles(theme => ({
  container: {
    overflowY: 'auto',
    position: 'relative',
    tableLayout: 'fixed',
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
  dayScaleEmptyCell: ({ leftPanelWidth, calculatedLeftPanelWidth }) => ({
    display: 'flex',
    alignItems: 'flex-end',
    width: leftPanelWidth || theme.spacing(calculatedLeftPanelWidth) + 1,
    minWidth: leftPanelWidth || theme.spacing(calculatedLeftPanelWidth) + 1,
  }),
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  relativeContainer: {
    position: 'relative',
  },
  inlineFlex: {
    display: 'inline-flex',
  },
  background: {
    background: theme.palette.background.paper,
  },
}));

export const MainLayout = React.memo(({
  timeScaleComponent: TimeScale,
  dayScaleComponent: DayScale,
  timeTableComponent: TimeTable,
  dayScaleEmptyCellComponent: DayScaleEmptyCell,
  groupingPanelComponent: GroupingPanel,
  groupingPanelSize,
  setScrollingStrategy,
  className,
  forwardedRef,
  ...restProps
}) => {
  const layoutRef = React.useRef(null);
  const layoutHeaderRef = React.useRef(null);
  const leftPanelRef = React.useRef(null);

  const [isLeftBorderSet, setIsLeftBorderSet] = React.useState(false);
  const [isTopBorderSet, setIsTopBorderSet] = React.useState(false);
  const [leftPanelWidth, setLeftPanelWidth] = React.useState(0);

  React.useEffect(() => {
    const leftPanel = leftPanelRef.current;
    setScrollingStrategy(scrollingStrategy(
      layoutRef.current, layoutHeaderRef.current, leftPanel,
    ));
    // eslint-disable-next-line no-unused-expressions
    leftPanel && setLeftPanelWidth(leftPanel.getBoundingClientRect().width);
  }, [layoutRef, layoutHeaderRef, leftPanelRef, setScrollingStrategy, setLeftPanelWidth]);

  const renderTimeScale = !!TimeScale;
  const renderLeftPanel = renderTimeScale || !!groupingPanelSize;

  const calculatedGroupPanelWidth = groupingPanelSize
    ? groupingPanelSize * GROUPING_PANEL_VERTICAL_CELL_WIDTH : 0;
  const calculatedLeftPanelWidth = LEFT_PANEL_WIDTH_SPACING + calculatedGroupPanelWidth;

  const classes = useStyles({ leftPanelWidth, calculatedLeftPanelWidth });

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
    <div
      ref={(node) => {
        layoutRef.current = node;
        if (typeof forwardedRef === 'function') {
          forwardedRef(node);
        } else if (forwardedRef) {
          // eslint-disable-next-line no-param-reassign
          forwardedRef.current = node;
        }
      }}
      className={classNames(classes.container, className)}
      onScroll={setBorders}
      {...restProps}
    >
      {/* Fix Safari sticky header https://bugs.webkit.org/show_bug.cgi?id=175029 */}
      <div>
        <div
          ref={layoutHeaderRef}
          className={classNames(classes.stickyElement, classes.header, classes.flexRow)}
        >
          <div
            className={classNames({
              [classes.background]: true,
              [classes.inlineFlex]: true,
              [classes.ordinaryHeaderBorder]: !isTopBorderSet,
              [classes.brightHeaderBorder]: isTopBorderSet,
            })}
          >
            {renderLeftPanel && (
              <div
                className={classNames({
                  [classes.stickyElement]: true,
                  [classes.leftPanel]: true,
                  [classes.dayScaleEmptyCell]: true,
                  [classes.ordinaryLeftPanelBorder]: !isLeftBorderSet,
                  [classes.brightLeftPanelBorder]: isLeftBorderSet,
                })}
              >
                <DayScaleEmptyCell />
              </div>
            )}

            <div>
              <DayScale />
            </div>
          </div>
        </div>

        <div className={classes.flexRow}>
          <div className={classes.inlineFlex}>
            {renderLeftPanel && (
              <div
                ref={leftPanelRef}
                className={classNames({
                  [classes.flexRow]: true,
                  [classes.stickyElement]: true,
                  [classes.leftPanel]: true,
                  [classes.ordinaryLeftPanelBorder]: !isLeftBorderSet,
                  [classes.brightLeftPanelBorder]: isLeftBorderSet,
                })}
              >
                <GroupingPanel />
                {renderTimeScale && (
                  <TimeScale />
                )}
              </div>
            )}
            <div className={classes.relativeContainer}>
              <TimeTable />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

MainLayout.propTypes = {
  // oneOfType is a workaround because withStyles returns react object
  timeScaleComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  dayScaleComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  timeTableComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  dayScaleEmptyCellComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  groupingPanelComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  groupingPanelSize: PropTypes.number,
  setScrollingStrategy: PropTypes.func.isRequired,
  className: PropTypes.string,
  forwardedRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

MainLayout.defaultProps = {
  groupingPanelComponent: () => null,
  timeScaleComponent: undefined,
  groupingPanelSize: 0,
  className: undefined,
  forwardedRef: undefined,
};
