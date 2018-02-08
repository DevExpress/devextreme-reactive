import * as React from 'react';
import * as PropTypes from 'prop-types';

export const GroupPanelEmptyMessage = ({ getMessage, ...restProps }) => (
  <div
    style={{
      padding: '7px 0',
    }}
    {...restProps}
  >
    {getMessage('groupByColumn')}
  </div>
);

GroupPanelEmptyMessage.propTypes = {
  getMessage: PropTypes.func.isRequired,
};
