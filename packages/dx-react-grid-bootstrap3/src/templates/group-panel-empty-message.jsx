import React from 'react';
import PropTypes from 'prop-types';

export const GroupPanelEmptyMessage = ({ getMessage }) => (
  <div
    style={{
      padding: '7px 0',
      marginBottom: '5px',
    }}
  >
    {getMessage('groupByColumn')}
  </div>
);

GroupPanelEmptyMessage.propTypes = {
  getMessage: PropTypes.func.isRequired,
};
