import React from 'react';
import PropTypes from 'prop-types';
import ToolbarMUI from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

export const EmptyMessage = ({ getMessage, ...restProps }) => (
  <ToolbarMUI
    {...restProps}
  >
    <Typography>
      {getMessage('noColumns')}
    </Typography>
  </ToolbarMUI>
);

EmptyMessage.propTypes = {
  getMessage: PropTypes.func.isRequired,
};
