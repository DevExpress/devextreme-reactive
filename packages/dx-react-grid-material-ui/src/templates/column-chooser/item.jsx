import * as React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles';

const PREFIX = 'Item';
export const classes = {
  checkbox: `${PREFIX}-checkbox`,
  itemText: `${PREFIX}-itemText`,
};

const StyledListItem = styled(ListItem)(({ theme }) => ({
  [`& .${classes.itemText}`]: {
    paddingLeft: theme.spacing(1),
  },
  [`& .${classes.checkbox}`]: {
    padding: 0,
  },
}));

export const Item = ({
  item: { column, hidden },
  disabled, onToggle,
  ...restProps
}) => (
  <StyledListItem
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
  </StyledListItem>
);

Item.propTypes = {
  item: PropTypes.shape({
    column: PropTypes.shape({
      name: PropTypes.string,
      title: PropTypes.string,
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
