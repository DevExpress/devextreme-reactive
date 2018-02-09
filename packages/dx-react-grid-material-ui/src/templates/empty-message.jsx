import * as React from 'react';
import * as PropTypes from 'prop-types';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

export const EmptyMessage = ({ getMessage, ...restProps }) => (
  <Toolbar
    {...restProps}
  >
    <Typography>
      {getMessage('noColumns')}
    </Typography>
  </Toolbar>
);

EmptyMessage.propTypes = {
  getMessage: PropTypes.func.isRequired,
};
