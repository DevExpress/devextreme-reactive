import React from 'react';
import PropTypes from 'prop-types';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

export const EmptyMessage = ({ getMessage }) => (
  <Toolbar>
    <Typography>
      {getMessage('noColumns')}
    </Typography>
  </Toolbar>
);

EmptyMessage.propTypes = {
  getMessage: PropTypes.func.isRequired,
};
