import * as React from 'react';
import * as PropTypes from 'prop-types';
import RootRef from '@material-ui/core/RootRef';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

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

const AUTO_HEIGHT = 'auto';

export class HorizontalViewLayoutBase extends React.PureComponent {
  render() {
    const {
      dayScaleComponent: Navbar,
      timeTableComponent: Main,
      classes,
      layoutRef,
      layoutHeaderRef,
      height,
    } = this.props;

    const containerStyle = height === AUTO_HEIGHT ? { height: '100%' } : { height: `${height}px` };
    return (
      <RootRef rootRef={layoutRef}>
        <Grid
          className={classes.container}
          container
          direction="column"
          wrap="nowrap"
          style={containerStyle}
        >
          <RootRef rootRef={layoutHeaderRef}>
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
  classes: PropTypes.object.isRequired,
  layoutRef: PropTypes.object.isRequired,
  layoutHeaderRef: PropTypes.object.isRequired,
  height: PropTypes.number,
};

HorizontalViewLayoutBase.defaultProps = {
  height: undefined,
};

export const HorizontalViewLayout = withStyles(styles, { name: 'HorizontalViewLayout' })(HorizontalViewLayoutBase);
