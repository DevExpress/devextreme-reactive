import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  flexibleSpace: {
    flex: '0 0 0',
    marginLeft: 'auto',
  },
};

export const FlexibleSpaceBase = ({ classes }) =>
  <div className={classes.flexibleSpace} />;

FlexibleSpaceBase.propTypes = {
  classes: PropTypes.object.isRequired,
};

export const FlexibleSpace = withStyles(styles, { name: 'FlexibleSpace' })(FlexibleSpaceBase);
