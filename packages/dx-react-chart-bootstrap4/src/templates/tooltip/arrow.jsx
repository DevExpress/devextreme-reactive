import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

export const Arrow = ({ arrowProps, className }) => (
  <div className={classNames('arrow', className)} {...arrowProps} />
);
Arrow.propTypes = {
  arrowProps: PropTypes.object.isRequired,
  className: PropTypes.string,
};

Arrow.defaultProps = {
  className: undefined,
};
