import React from 'react';
import PropTypes from 'prop-types';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

export const EmptyMessage = ({ text }) => (
  <Toolbar>
    <Typography>
      {text}
    </Typography>
  </Toolbar>
);

EmptyMessage.propTypes = {
  text: PropTypes.string.isRequired,
};
