import * as React from 'react';
import PropTypes from 'prop-types';
import {
  Menu, MenuItem, ListItemIcon, ListItemText, styled,
} from '@mui/material';

const PREFIX = 'FilterSelector';
export const classes = {
  icon: `${PREFIX}-icon`,
  iconItem: `${PREFIX}-iconItem`,
  selectMenu: `${PREFIX}-selectMenu`,
};

const StyledMenu = styled(Menu)(({ theme }) => ({
  [`&.${classes.selectMenu}`]: {
    position: 'absolute !important',
  },
  [`& .${classes.iconItem}`]: {
    minWidth: theme.spacing(2),
  },
}));

export class FilterSelector extends React.PureComponent {
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
      iconComponent: Icon, toggleButtonComponent: ToggleButton,
    } = this.props;
    const { opened } = this.state;

    const StyledIcon = styled(Icon)(({ theme }) => ({
      [`&.${classes.icon}`]: {
        marginRight: theme.spacing(1),
      },
    }));
    return availableValues.length ? (
      <React.Fragment>
        <ToggleButton
          buttonRef={this.setButtonRef}
          onToggle={this.handleButtonClick}
          disabled={disabled || availableValues.length === 1}
        >
          <Icon type={value} />
        </ToggleButton>
        <StyledMenu
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
                <StyledIcon
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
        </StyledMenu>
      </React.Fragment>
    ) : null;
  }
}

FilterSelector.propTypes = {
  value: PropTypes.string,
  availableValues: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  // oneOfType is a workaround because React.memo returns react object
  iconComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  // oneOfType is a workaround because withStyles returns react object
  toggleButtonComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  getMessage: PropTypes.func.isRequired,
};

FilterSelector.defaultProps = {
  value: undefined,
  availableValues: [],
  onChange: () => {},
  disabled: false,
};
