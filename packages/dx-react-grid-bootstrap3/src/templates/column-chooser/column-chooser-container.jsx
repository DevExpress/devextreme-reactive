import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const ColumnChooserContainer = ({
  children,
  items,
  onItemToggle,
  className,
  ...restProps
}) => (
  <div
    className={classNames('list-group', className)}
    {...restProps}
  >
    {children}
  </div>
);

ColumnChooserContainer.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  items: PropTypes.arrayOf(PropTypes.object),
  className: PropTypes.string,
  onItemToggle: PropTypes.func,
};

ColumnChooserContainer.defaultProps = {
  className: undefined,
  onItemToggle: undefined,
  items: [],
};
