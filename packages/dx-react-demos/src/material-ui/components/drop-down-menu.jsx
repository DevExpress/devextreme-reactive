import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Menu, MenuItem } from 'material-ui';
import { withStyles, createStyleSheet } from 'material-ui/styles';

import ExpandMore from 'material-ui-icons/ExpandMore';
import ExpandLess from 'material-ui-icons/ExpandLess';

const styleSheet = createStyleSheet('DropDownMenu', theme => ({
  button: {
    cursor: 'pointer',
    textTransform: 'none',
    fontWeight: 'bold',
    lineHeight: `${theme.spacing.unit * 3}px`,
    width: '70px',
  },
  buttonIcon: {
    width: theme.spacing.unit * 2,
    float: 'right',
  },
}));

class DropDownMenuBase extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      anchorEl: undefined,
      open: false,
      selectedIndex: undefined,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
  }

  handleClick(event) {
    this.setState({ open: true, anchorEl: event.currentTarget });
  }

  handleMenuItemClick(event, index) {
    this.props.onItemClick(this.props.items[index], index);
    this.setState({ selectedIndex: index, open: false });
  }

  render() {
    const { title, items, classes } = this.props;
    const { anchorEl, open, selectedIndex } = this.state;

    return (
      <div>
        <Typography
          type="button"
          onClick={this.handleClick}
          className={classes.button}
        >
          {title}
          {
            open
            ? <ExpandLess className={classes.buttonIcon} />
            : <ExpandMore className={classes.buttonIcon} />
          }
        </Typography>
        <Menu
          anchorEl={anchorEl}
          open={open}
        >
          {items.map((item, index) => (
            <MenuItem
              key={item}
              selected={index === selectedIndex}
              onClick={event => this.handleMenuItemClick(event, index)}
            >
              {item}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}

DropDownMenuBase.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  classes: PropTypes.object.isRequired,
  onItemClick: PropTypes.func.isRequired,
};

export const DropDownMenu = withStyles(styleSheet)(DropDownMenuBase);
