import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'clsx';

export const Content = ({
  column, children, align, className, ...restProps
}) => (
  <div
    className={classNames({
      'dx-g-bs4-header-cell-content w-100 d-flex flex-row align-items-end': true,
      'justify-content-center': align === 'center',
      'justify-content-end': align === 'right',
    }, className)}
    {...restProps}
  >
    {children}
  </div>
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
