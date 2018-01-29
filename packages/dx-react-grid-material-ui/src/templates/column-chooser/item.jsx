import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, ListItemText } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';

export const Item = ({
  item: { column, hidden },
  disabled, onToggle,
  ...restProps
}) => (
  <ListItem
    key={column.name}
    button={!disabled}
    onClick={onToggle}
    {...restProps}
  >
    <Checkbox
      checked={!hidden}
      tabIndex={-1}
      disableRipple
      disabled={disabled}
      style={{ width: 'auto', height: 'auto' }}
    />
    <ListItemText primary={column.title || column.name} />
  </ListItem>
);

Item.propTypes = {
  item: PropTypes.shape({
    column: PropTypes.shape({
      name: PropTypes.string,
    }),
    hidden: PropTypes.bool,
  }).isRequired,
  disabled: PropTypes.bool,
  onToggle: PropTypes.func,
};

Item.defaultProps = {
  onToggle: () => { },
  disabled: false,
};
