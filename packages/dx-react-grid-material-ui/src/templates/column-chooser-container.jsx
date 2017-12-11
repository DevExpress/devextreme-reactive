import React from 'react';
import PropTypes from 'prop-types';
import List from 'material-ui/List';

export const ColumnChooserContainer = ({
  children,
  items,
  onItemToggle,
  ...restProps
}) => (
  <List
    dense
    {...restProps}
  >
    {children}
  </List>
);

ColumnChooserContainer.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  items: PropTypes.arrayOf(PropTypes.object),
  onItemToggle: PropTypes.func,
};

ColumnChooserContainer.defaultProps = {
  items: [],
  onItemToggle: undefined,
};
