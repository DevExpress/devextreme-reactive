import React from 'react';
import PropTypes from 'prop-types';

export const EmptyMessage = ({ text }) => (
  <div className="panel-body">
    {text}
  </div>
);

EmptyMessage.propTypes = {
  text: PropTypes.string.isRequired,
};
