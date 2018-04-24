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

class FilterSelectorBase extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = { anchorEl: null };

    this.handleButtonClick = (event) => {
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
    return availableValues.length ? (
      <React.Fragment>
        <IconButton
          onClick={this.handleButtonClick}
          disabled={availableValues.length <= 1}
        >
          <Icon type={value} />
        </IconButton>
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
      </React.Fragment>
    ) : null;
  }
}

FilterSelectorBase.propTypes = {
  value: PropTypes.string,
  availableValues: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
  iconComponent: PropTypes.func.isRequired,
  getMessage: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

FilterSelectorBase.defaultProps = {
  value: undefined,
  availableValues: [],
  onChange: () => {},
};

export const FilterSelector = withStyles(styles, { name: 'DropDown' })(FilterSelectorBase);
