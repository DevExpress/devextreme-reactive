import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const EmptyMessage = ({ getMessage, className, ...restProps }) => (
  <div
    className={classNames('panel-body', className)}
    {...restProps}
  >
    {getMessage('noColumns')}
  </div>
);

EmptyMessage.propTypes = {
  getMessage: PropTypes.func.isRequired,
  className: PropTypes.string,
};

EmptyMessage.defaultProps = {
  className: undefined,
};
