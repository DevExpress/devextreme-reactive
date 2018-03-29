import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import './cell-content.css';

export const CellContent = ({
  children, align, className, ...restProps
}) => (
  <div
    className={classNames({
      'text-nowrap dx-rg-bs4-table-header-cell-wrapper': true,
      [`text-${align}`]: align !== 'left',
    }, className)}
    {...restProps}
  >
    {children}
  </div>
);

CellContent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  align: PropTypes.string,
  className: PropTypes.string,
};

CellContent.defaultProps = {
  align: 'left',
  className: null,
  children: undefined,
};
