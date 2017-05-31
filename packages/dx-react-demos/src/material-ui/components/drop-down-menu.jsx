import React from 'react';
import PropTypes from 'prop-types';
import { Button, Menu, MenuItem } from 'material-ui';

export class DropDownMenu extends React.PureComponent {
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
    const { title, items } = this.props;
    const { anchorEl, open, selectedIndex } = this.state;

    return (
      <div>
        <Button aria-haspopup="true" onClick={this.handleClick}>
          {title}
        </Button>
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

DropDownMenu.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  onItemClick: PropTypes.func.isRequired,
};
