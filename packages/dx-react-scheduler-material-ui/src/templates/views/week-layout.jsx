import * as React from 'react';
import * as PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { getBorder } from '../utils';

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
  emptySpace: {
    borderBottom: getBorder(theme),
  },
  main: {
    position: 'relative',
  },
});

export class WeekLayoutBase extends React.PureComponent {
  render() {
    const {
      sidebarComponent: Sidebar,
      navbarComponent: Navbar,
      mainComponent: Main,
      classes,
    } = this.props;

    return (
      <Grid
        container
        className={classes.container}
      >
        <Grid
          container
          direction="row"
          className={classes.stickyHeader}
        >
          <Grid item xs={1} className={classes.emptySpace} />

          <Grid item xs={11}>
            <Navbar />
          </Grid>
        </Grid>

        <Grid container direction="row">
          <Grid item xs={1}>
            <Sidebar />
          </Grid>

          <Grid item xs={11} className={classes.main}>
            <Main />
          </Grid>
        </Grid>

      </Grid>
    );
  }
}

WeekLayoutBase.propTypes = {
  sidebarComponent: PropTypes.func.isRequired,
  navbarComponent: PropTypes.func.isRequired,
  mainComponent: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export const WeekLayout = withStyles(styles, { name: 'WeekLayout' })(WeekLayoutBase);
