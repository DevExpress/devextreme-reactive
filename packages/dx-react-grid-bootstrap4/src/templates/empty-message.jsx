import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'clsx';

export const EmptyMessage = ({ getMessage, className, ...restProps }) => (
  <div
    className={classNames('py-5 text-center', className)}
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
};

EmptyMessage.defaultProps = {
  className: undefined,
};
