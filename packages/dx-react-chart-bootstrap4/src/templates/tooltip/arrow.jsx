import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

export const Arrow = ({
  className, placement, refEl, ...restProps
}) => (
  <div className={classNames('arrow', className)} ref={refEl} {...restProps} />
);
Arrow.propTypes = {
  refEl: PropTypes.func.isRequired,
  placement: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Arrow.defaultProps = {
  className: undefined,
};
