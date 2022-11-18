import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'clsx';

export const EmptyMessage = ({
  getMessage,
  className,
  style,
  ...restProps
}) => (
  <div
    className={classNames('panel-body', className)}
    style={{
      textAlign: 'center',
      padding: '40px 0px',
      ...style,
    }}
    {...restProps}
  >
    <big className="text-muted">
      {getMessage('noColumns')}
    </big>
  </div>
);

EmptyMessage.propTypes = {
  getMessage: PropTypes.func.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
};

EmptyMessage.defaultProps = {
  className: undefined,
  style: null,
};
