import * as React from 'react';
import * as PropTypes from 'prop-types';
import { AUTO_HEIGHT } from '@devexpress/dx-scheduler-core';
import RootRef from '@material-ui/core/RootRef';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { scrollingAPI } from '../utils';

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
  main: {
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
    const { setScrollingAPI } = this.props;

    setScrollingAPI(scrollingAPI(this.layout.current, this.layoutHeader.current));
  }

  componentDidUpdate() {
    const { setScrollingAPI } = this.props;

    setScrollingAPI(scrollingAPI(this.layout.current, this.layoutHeader.current));
  }

  render() {
    const {
      dayScaleComponent: Navbar,
      timeTableComponent: Main,
      classes,
      height,
    } = this.props;

    const containerStyle = height === AUTO_HEIGHT ? { height: '100%' } : { height: `${height}px` };

    return (
      <RootRef rootRef={this.layout}>
        <Grid
          className={classes.container}
          container
          direction="column"
          wrap="nowrap"
          style={containerStyle}
        >
          <RootRef rootRef={this.layoutHeader}>
            <Grid
              item
              className={classes.stickyHeader}
            >
              <Navbar />
            </Grid>
          </RootRef>
          <Grid
            item
            className={classes.main}
          >
            <Main />
          </Grid>
        </Grid>
      </RootRef>
    );
  }
}

HorizontalViewLayoutBase.propTypes = {
  dayScaleComponent: PropTypes.func.isRequired,
  timeTableComponent: PropTypes.func.isRequired,
  setScrollingAPI: PropTypes.func.isRequired,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  classes: PropTypes.object.isRequired,
};

export const HorizontalViewLayout = withStyles(styles, { name: 'HorizontalViewLayout' })(HorizontalViewLayoutBase);
