import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

const BaseArrow = ({
  className, placement, ...restProps
}, ref) => (
  <div className={classNames('arrow', className)} ref={ref} {...restProps} />
);
BaseArrow.propTypes = {
  placement: PropTypes.string.isRequired,
  className: PropTypes.string,
};

BaseArrow.defaultProps = {
  className: undefined,
};

export const Arrow = React.forwardRef(BaseArrow);
