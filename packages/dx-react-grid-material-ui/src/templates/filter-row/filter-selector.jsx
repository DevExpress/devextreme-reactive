import * as React from 'react';
import * as PropTypes from 'prop-types';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import withStyles from '@mui/styles/withStyles';

const styles = ({ spacing }) => ({
  icon: {
    marginRight: spacing(1),
  },
  iconItem: {
    minWidth: spacing(2),
  },
  selectMenu: {
    position: 'absolute !important',
  },
});

class FilterSelectorBase extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      opened: false,
    };

    this.setButtonRef = (buttonRef) => {
      this.buttonRef = buttonRef;
    };
    this.handleButtonClick = () => {
      this.setState(prevState => ({ opened: !prevState.opened }));
    };
    this.handleMenuClose = () => {
      this.setState({ opened: false });
    };
    this.handleMenuItemClick = (nextValue) => {
      const { onChange } = this.props;
      this.setState({ opened: false });
      onChange(nextValue);
    };
  }

  render() {
    const {
      value, availableValues, disabled, getMessage,
      iconComponent: Icon, toggleButtonComponent: ToggleButton, classes,
    } = this.props;
    const { opened } = this.state;
    return availableValues.length ? (
      <React.Fragment>
        <ToggleButton
          buttonRef={this.setButtonRef}
          onToggle={this.handleButtonClick}
          disabled={disabled || availableValues.length === 1}
        >
          <Icon type={value} />
        </ToggleButton>
        <Menu
          anchorEl={this.buttonRef}
          open={opened}
          onClose={this.handleMenuClose}
          MenuListProps={{ dense: true }}
          className={classes.selectMenu}
        >
          {availableValues.map(valueItem => (
            <MenuItem
              key={valueItem}
              selected={valueItem === value}
              onClick={() => this.handleMenuItemClick(valueItem)}
            >
              <ListItemIcon
                className={classes.iconItem}
              >
                <Icon
                  type={valueItem}
                  className={classes.icon}
                  fontSize="small"
                />
              </ListItemIcon>
              <ListItemText>
                {getMessage(valueItem)}
              </ListItemText>
            </MenuItem>
          ))}
        </Menu>
      </React.Fragment>
    ) : null;
  }
}

FilterSelectorBase.propTypes = {
  value: PropTypes.string,
  availableValues: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  // oneOfType is a workaround because React.memo returns react object
  iconComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  // oneOfType is a workaround because withStyles returns react object
  toggleButtonComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  getMessage: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

FilterSelectorBase.defaultProps = {
  value: undefined,
  availableValues: [],
  onChange: () => {},
  disabled: false,
};

export const FilterSelector = withStyles(styles, { name: 'FilterSelector' })(FilterSelectorBase);
