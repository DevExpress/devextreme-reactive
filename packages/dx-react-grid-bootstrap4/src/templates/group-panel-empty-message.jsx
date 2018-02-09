import React from 'react';
import PropTypes from 'prop-types';

export const GroupPanelEmptyMessage = ({ getMessage, ...restProps }) => (
  <div
    style={{
      padding: '11px 0',
    }}
    {...restProps}
  >
    {getMessage('groupByColumn')}
  </div>
);

GroupPanelEmptyMessage.propTypes = {
  getMessage: PropTypes.func.isRequired,
};
