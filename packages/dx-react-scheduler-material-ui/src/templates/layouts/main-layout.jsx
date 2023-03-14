import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material';
import classNames from 'clsx';
import {
  scrollingStrategy,
  getBorder,
  getBrightBorder,
  getEmptyCellWidth,
} from '../utils';
import { GROUPING_PANEL_VERTICAL_CELL_WIDTH, LEFT_PANEL_WIDTH_SPACING } from '../constants';

const PREFIX = 'MainLayout';

export const classes = {
  container: `${PREFIX}-container`,
  stickyElement: `${PREFIX}-stickyElement`,
  header: `${PREFIX}-header`,
  leftPanel: `${PREFIX}-leftPanel`,
  ordinaryLeftPanelBorder: `${PREFIX}-ordinaryLeftPanelBorder`,
  brightLeftPanelBorder: `${PREFIX}-brightLeftPanelBorder`,
  ordinaryHeaderBorder: `${PREFIX}-ordinaryHeaderBorder`,
  brightHeaderBorder: `${PREFIX}-brightHeaderBorder`,
  dayScaleEmptyCell: `${PREFIX}-dayScaleEmptyCell`,
  flexRow: `${PREFIX}-flexRow`,
  relativeContainer: `${PREFIX}-relativeContainer`,
  inlineFlex: `${PREFIX}-inlineFlex`,
  background: `${PREFIX}-background`,
};

const StyledDiv = styled('div', {
  shouldForwardProp: prop => prop !== 'leftPanelWidth' && prop !== 'calculatedLeftPanelWidth',
})(({ theme, leftPanelWidth, calculatedLeftPanelWidth }) => ({
  [`&.${classes.container}`]: {
    overflowY: 'auto',
    position: 'relative',
    tableLayout: 'fixed',
  },
  [`& .${classes.stickyElement}`]: {
    tableLayout: 'fixed',
    position: 'sticky',
    overflow: 'visible',
    background: theme.palette.background.paper,
  },
  [`& .${classes.header}`]: {
    top: 0,
    zIndex: 2,
  },
  [`& .${classes.leftPanel}`]: {
    left: 0,
    zIndex: 1,
    boxSizing: 'border-box',
  },
  [`& .${classes.ordinaryLeftPanelBorder}`]: {
    borderRight: getBorder(theme),
  },
  [`& .${classes.brightLeftPanelBorder}`]: {
    borderRight: getBrightBorder(theme),
  },
  [`& .${classes.ordinaryHeaderBorder}`]: {
    borderBottom: getBorder(theme),
  },
  [`& .${classes.brightHeaderBorder}`]: {
    borderBottom: getBrightBorder(theme),
  },
  [`& .${classes.dayScaleEmptyCell}`]: {
    display: 'flex',
    alignItems: 'flex-end',
    width: getEmptyCellWidth(theme, leftPanelWidth, calculatedLeftPanelWidth),
    minWidth: getEmptyCellWidth(theme, leftPanelWidth, calculatedLeftPanelWidth),
  },
  [`& .${classes.flexRow}`]: {
    display: 'flex',
    flexDirection: 'row',
  },
  [`& .${classes.relativeContainer}`]: {
    position: 'relative',
  },
  [`& .${classes.inlineFlex}`]: {
    display: 'inline-flex',
  },
  [`& .${classes.background}`]: {
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
    <StyledDiv
      leftPanelWidth={leftPanelWidth}
      calculatedLeftPanelWidth={calculatedLeftPanelWidth}
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
    </StyledDiv>
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
