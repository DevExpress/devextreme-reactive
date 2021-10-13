import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';

export const GroupPanelEmptyMessage = ({
  getMessage,
  className,
  forwardedRef,
  ...restProps
}) => (
  <div
    ref={forwardedRef}
    className={classNames('dx-g-bs4-group-panel-empty-message', className)}
    {...restProps}
  >
    {getMessage('groupByColumn')}
  </div>
);

GroupPanelEmptyMessage.propTypes = {
  getMessage: PropTypes.func.isRequired,
  className: PropTypes.string,
  forwardedRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

GroupPanelEmptyMessage.defaultProps = {
  className: undefined,
  forwardedRef: undefined,
};
