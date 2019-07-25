import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

export const Arrow = ({
  arrowProps, className, placement, ...restProps
}) => (
  <div className={classNames('arrow', className)} {...arrowProps} {...restProps} />
);
Arrow.propTypes = {
  arrowProps: PropTypes.object.isRequired,
  placement: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Arrow.defaultProps = {
  className: undefined,
};
