import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ListItem, ListItemText } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';

export const Item = ({
  item: { column, hidden },
  onToggle,
  ...restProps
}) => (
  <ListItem
    key={column.name}
    button
    onClick={onToggle}
    {...restProps}
  >
    <Checkbox
      checked={!hidden}
      tabIndex={-1}
      disableRipple
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
  onToggle: PropTypes.func,
};

Item.defaultProps = {
  onToggle: () => { },
};
