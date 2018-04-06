import * as React from 'react';
import * as PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import Menu, { MenuItem } from 'material-ui/Menu';
import { withStyles } from 'material-ui/styles';

const styles = ({ spacing }) => ({
  icon: {
    marginRight: spacing.unit,
  },
});

class DropDownBase extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = { anchorEl: null };

    this.handleClick = (event) => {
      this.setState({ anchorEl: event.currentTarget });
    };
    this.handleMenuClose = () => {
      this.setState({ anchorEl: null });
    };
    this.handleMenuItemClick = (nextValue) => {
      this.setState({ anchorEl: null });
      this.props.onChange(nextValue);
    };
  }
  render() {
    const {
      value, availableValues, getMessage, iconComponent: Icon, classes,
    } = this.props;
    const { anchorEl } = this.state;
    return (
      <React.Fragment>
        <IconButton
          onClick={this.handleClick}
          disabled={availableValues.length <= 1}
        >
          <Icon type={value} />
        </IconButton>
        {availableValues.length > 1 && (
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={this.handleMenuClose}
          >
            {availableValues.map(valueItem => (
              <MenuItem
                key={valueItem}
                selected={valueItem === value}
                onClick={() => this.handleMenuItemClick(valueItem)}
              >
                <Icon
                  type={valueItem}
                  className={classes.icon}
                />
                {getMessage(valueItem)}
              </MenuItem>
            ))}
          </Menu>
        )}
      </React.Fragment>
    );
  }
}

DropDownBase.propTypes = {
  value: PropTypes.string,
  availableValues: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
  iconComponent: PropTypes.func.isRequired,
  getMessage: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

DropDownBase.defaultProps = {
  value: undefined,
  availableValues: [],
  onChange: () => {},
};

export const DropDown = withStyles(styles, { name: 'DropDown' })(DropDownBase);
