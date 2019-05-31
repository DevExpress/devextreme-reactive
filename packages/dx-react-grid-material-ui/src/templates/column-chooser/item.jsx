import * as React from 'react';
import * as PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/styles';

const styles = ({
  checkbox: {
    padding: 0,
  },
  itemText: {
    paddingLeft: 8,
  },
});

const ItemBase = ({
  item: { column, hidden },
  disabled, onToggle,
  classes,
  ...restProps
}) => (
  <ListItem
    key={column.name}
    button={!disabled}
    component="li"
    disabled={disabled}
    onClick={!disabled ? onToggle : null}
    {...restProps}
  >
    <Checkbox
      checked={!hidden}
      tabIndex={-1}
      disableRipple
      disabled={disabled}
      className={classes.checkbox}
    />
    <ListItemText className={classes.itemText} primary={column.title || column.name} />
  </ListItem>
);

ItemBase.propTypes = {
  item: PropTypes.shape({
    column: PropTypes.shape({
      name: PropTypes.string,
    }),
    hidden: PropTypes.bool,
  }).isRequired,
  disabled: PropTypes.bool,
  onToggle: PropTypes.func,
  classes: PropTypes.object.isRequired,
};

ItemBase.defaultProps = {
  onToggle: () => { },
  disabled: false,
};

export const Item = withStyles(styles, { name: 'Item' })(ItemBase);
