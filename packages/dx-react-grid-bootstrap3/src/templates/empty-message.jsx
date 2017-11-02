import React from 'react';
import PropTypes from 'prop-types';

export const EmptyMessage = ({ getMessage }) => (
  <div className="panel-body">
    {getMessage('noColumns')}
  </div>
);

EmptyMessage.propTypes = {
  getMessage: PropTypes.func.isRequired,
};
