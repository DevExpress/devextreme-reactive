import * as React from 'react';
import * as PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  container: {
    overflowY: 'auto',
    height: 700,
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

export class MonthLayoutBase extends React.PureComponent {
  render() {
    const {
      navbarComponent: Navbar,
      mainComponent: Main,
      classes,
    } = this.props;

    return (
      <Grid
        className={classes.container}
        container
        direction="column"
        wrap="nowrap"
      >
        <Grid
          item
          className={classes.stickyHeader}
        >
          <Navbar />
        </Grid>
        <Grid
          item
          className={classes.main}
        >
          <Main />
        </Grid>
      </Grid>
    );
  }
}

MonthLayoutBase.propTypes = {
  navbarComponent: PropTypes.func.isRequired,
  mainComponent: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export const MonthLayout = withStyles(styles, { name: 'MonthLayout' })(MonthLayoutBase);
