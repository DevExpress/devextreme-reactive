import * as React from 'react';
import * as PropTypes from 'prop-types';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';

const styles = ({ spacing }) => ({
  icon: {
    marginRight: spacing.unit,
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
        >
          {availableValues.map(valueItem => (
            <MenuItem
              key={valueItem}
              selected={valueItem === value}
              onClick={() => this.handleMenuItemClick(valueItem)}
            >
              <ListItemIcon>
                <Icon
                  type={valueItem}
                  className={classes.icon}
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
  iconComponent: PropTypes.func.isRequired,
  toggleButtonComponent: PropTypes.func.isRequired,
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
