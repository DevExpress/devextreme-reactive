import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

export const CellContent = ({
  children, align, showGroupingControls, className, ...restProps
}) => (
  <div
    className={classNames({
      'text-nowrap dx-rg-bs4-table-header-cell-wrapper': true,
      [`text-${align}`]: align !== 'left',
      [`dx-rg-bs4-table-header-cell-${align}`]: showGroupingControls,
    }, className)}
    {...restProps}
  >
    {children}
  </div>
);

CellContent.propTypes = {
  children: PropTypes.node.isRequired,
  align: PropTypes.string,
  showGroupingControls: PropTypes.bool,
  className: PropTypes.string,
};

CellContent.defaultProps = {
  align: 'left',
  showGroupingControls: false,
  className: null,
};
