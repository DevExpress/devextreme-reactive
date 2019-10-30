import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { TableRow as RowBase } from '../table-row';

export const Row = ({ children, className, ...props }) => (
  <RowBase
    {...props}
    className={classNames('dx-g-bs4-cursor-pointer', className)}
  >
    {children}
  </RowBase>
);

Row.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

Row.defaultProps = {
  children: null,
  className: undefined,
};
