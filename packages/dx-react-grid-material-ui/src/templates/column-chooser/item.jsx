import * as React from 'react';
import * as PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

export const Item = ({
  item: { column, hidden },
  disabled, onToggle,
  ...restProps
}) => (
  <ListItem
    key={column.name}
    button={!disabled}
    disabled={disabled}
    onClick={!disabled ? onToggle : null}
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
