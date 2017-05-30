import React from 'react';
import PropTypes from 'prop-types';
import { TableCell, Button, Menu, MenuItem } from 'material-ui';

const options = [
  '-',
  'Male',
  'Female',
];

export class SexFilterCell extends React.PureComponent {
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
    this.props.setFilter(index > 0 ? { value: options[index] } : null);
    this.setState({ selectedIndex: index, open: false });
  }

  render() {
    return (
      <TableCell>
        <Button aria-haspopup="true" onClick={this.handleClick}>
          Sex
        </Button>
        <Menu
          anchorEl={this.state.anchorEl}
          open={this.state.open}
        >
          {options.map((option, index) => (
            <MenuItem
              key={option}
              selected={index === this.state.selectedIndex}
              onClick={event => this.handleMenuItemClick(event, index)}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </TableCell>
    );
  }
}

SexFilterCell.propTypes = {
  setFilter: PropTypes.func.isRequired,
};
