import * as React from 'react';
import * as PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

export class WeekLayout extends React.PureComponent {
  render() {
    const {
      sidebarComponent: Sidebar,
      ...restProps
    } = this.props;

    return (
      <Grid
        container
        {...restProps}
      >
        <Grid item xs={12} sm={12} style={{ height: '500px', overflowY: 'scroll', overflowX: 'hidden', display: 'flex', flexDirection: 'row' }}>
          <Grid item xs={12} sm={1}>
            <Sidebar />
          </Grid>
        </Grid>

      </Grid>
    );
  }
}

WeekLayout.propTypes = {
  sidebarComponent: PropTypes.func.isRequired,
};
