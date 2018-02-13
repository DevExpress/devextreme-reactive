import * as React from 'react';
import * as PropTypes from 'prop-types';
import './group-panel-empty-message.css';

export const GroupPanelEmptyMessage = ({ getMessage, ...restProps }) => (
  <div
    className="group-panel-empty-message"
    {...restProps}
  >
    {getMessage('groupByColumn')}
  </div>
);

GroupPanelEmptyMessage.propTypes = {
  getMessage: PropTypes.func.isRequired,
};
