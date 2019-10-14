import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';

export const GroupPanelEmptyMessage = ({ getMessage, className, ...restProps }) => (
  <div
    className={classNames('dx-g-bs4-group-panel-empty-message', className)}
    {...restProps}
  >
    {getMessage('groupByColumn')}
  </div>
);

GroupPanelEmptyMessage.propTypes = {
  getMessage: PropTypes.func.isRequired,
  className: PropTypes.string,
};

GroupPanelEmptyMessage.defaultProps = {
  className: undefined,
};
