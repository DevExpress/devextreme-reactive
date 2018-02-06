import * as React from 'react';
import * as PropTypes from 'prop-types';

export const GroupPanelEmptyMessage = ({ getMessage, style, ...restProps }) => (
  <div
    style={{
      padding: '7px 0',
      ...style,
    }}
    {...restProps}
  >
    {getMessage('groupByColumn')}
  </div>
);

GroupPanelEmptyMessage.propTypes = {
  getMessage: PropTypes.func.isRequired,
  style: PropTypes.object,
};

GroupPanelEmptyMessage.defaultProps = {
  style: null,
};
