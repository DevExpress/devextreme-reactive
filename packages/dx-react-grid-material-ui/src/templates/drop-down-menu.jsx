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
    lineHeight: theme.typography.subheading.lineHeight,
  },
  buttonIcon: {
    width: theme.spacing.unit * 2,
    float: 'right',
  },
  selected: {
    color: theme.palette.text.primary,
  },
}));

class DropDownMenuBase extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      anchorEl: undefined,
      open: false,
      selectedIndex: undefined,
      title: this.props.defaultTitle,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
  }

  handleClick(event) {
    this.setState({ open: true, anchorEl: event.currentTarget });
  }

  handleMenuItemClick(event, index) {
    const title = this.props.items[index];
    this.props.onItemClick(title, index);
    this.setState({
      selectedIndex: index,
      open: false,
      title: index ? title : this.props.defaultTitle,
    });
  }

  render() {
    const { items, classes, className } = this.props;
    const { anchorEl, open, selectedIndex, title } = this.state;

    return (
      <div className={className}>
        <Typography
          type="button"
          onClick={this.handleClick}
          className={classes.button}
        >
          <span className={selectedIndex ? classes.selected : null}>
            {title}
          </span>
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
  defaultTitle: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  items: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])).isRequired,
  classes: PropTypes.object.isRequired,
  onItemClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};

DropDownMenuBase.defaultProps = {
  className: null,
};

export const DropDownMenu = withStyles(styleSheet)(DropDownMenuBase);
