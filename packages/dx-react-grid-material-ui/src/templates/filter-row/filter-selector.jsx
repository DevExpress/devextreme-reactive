import * as React from 'react';
import * as PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
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
    const { onChange } = this.props;

    this.state = { anchorEl: null };

    this.handleButtonClick = (event) => {
      this.setState({ anchorEl: event.currentTarget });
    };
    this.handleMenuClose = () => {
      this.setState({ anchorEl: null });
    };
    this.handleMenuItemClick = (nextValue) => {
      this.setState({ anchorEl: null });
      onChange(nextValue);
    };
  }

  render() {
    const {
      value, availableValues, disabled, getMessage, iconComponent: Icon, classes,
    } = this.props;
    const { anchorEl } = this.state;
    return availableValues.length ? (
      <React.Fragment>
        <IconButton
          onClick={this.handleButtonClick}
          disabled={disabled || availableValues.length === 1}
        >
          <Icon type={value} />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
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
