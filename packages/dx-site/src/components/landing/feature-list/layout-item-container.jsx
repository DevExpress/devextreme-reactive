import * as React from 'react';
import PropTypes from 'prop-types';

const LayoutItemContainer = ({
  md, sm = md, xs = 12, children, className,
}) => (
  <div className={`${className} col-md-${md} col-sm-${sm} col-${xs}`}>
    {children}
  </div>
);

LayoutItemContainer.propTypes = {
  children: PropTypes.node.isRequired,
  md: PropTypes.number.isRequired,
  sm: PropTypes.number,
  xs: PropTypes.number,
  className: PropTypes.string,
};

LayoutItemContainer.defaultProps = {
  sm: undefined,
  xs: undefined,
  className: undefined,
};

export default LayoutItemContainer;
