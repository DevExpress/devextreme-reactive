import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

export const Content = ({
  column, children, align, className, ...restProps
}) => (
  <span
    className={classNames({
      'w-100 dx-rg-bs4-table-header-cell-wrapper': true,
      [`text-${align}`]: align !== 'left',
    }, className)}
    {...restProps}
  >
    {children}
  </span>
);

Content.propTypes = {
  column: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  align: PropTypes.string,
  className: PropTypes.string,
};

Content.defaultProps = {
  column: undefined,
  align: 'left',
  className: null,
  children: undefined,
};
