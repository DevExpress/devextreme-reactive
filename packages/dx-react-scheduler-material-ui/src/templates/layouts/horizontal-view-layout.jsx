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

class HorizontalViewLayoutBase extends React.PureComponent {
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
      dayScaleComponent: DayScale,
      timeTableComponent: TimeTable,
      setScrollingStrategy,
      classes,
      className,
      ...restProps
    } = this.props;

    return (
      <Grid
        ref={this.layout}
        className={classNames(classes.container, className)}
        container
        direction="column"
        wrap="nowrap"
        {...restProps}
      >
        {/* Fix Safari sticky header https://bugs.webkit.org/show_bug.cgi?id=175029 */}
        <div>
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
        </div>
      </Grid>
    );
  }
}

HorizontalViewLayoutBase.propTypes = {
  // oneOfType is a workaround because withStyles returns react object
  dayScaleComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  timeTableComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  setScrollingStrategy: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

HorizontalViewLayoutBase.defaultProps = {
  className: undefined,
};

export const HorizontalViewLayout = withStyles(styles, { name: 'HorizontalViewLayout' })(HorizontalViewLayoutBase);
