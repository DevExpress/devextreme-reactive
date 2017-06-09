import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
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
  title: {
    display: 'inline-block',
    width: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    verticalAlign: 'middle',
    paddingLeft: theme.spacing.unit * 3,
    marginLeft: -(theme.spacing.unit * 3),
  },
  selected: {
    color: theme.palette.text.primary,
  },
}));

class DropDownMenuBase extends React.PureComponent {

  constructor(props) {
    super(props);

    const selectedItem = this.props.selectedItem;

    this.state = {
      anchorEl: undefined,
      open: false,
      selectedIndex: this.props.items.findIndex(item => item === selectedItem),
      title: this.props.defaultTitle || selectedItem,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }

  handleClick(event) {
    this.setState({ open: true, anchorEl: event.currentTarget });
  }

  handleMenuItemClick(event, index) {
    let title = this.props.items[index];
    if (index === 0 && this.props.defaultTitle) {
      title = this.props.defaultTitle;
    }

    this.props.onItemClick(title, index);
    this.setState({
      selectedIndex: index,
      open: false,
      title,
    });
  }

  handleRequestClose() {
    this.setState({ open: false });
  }

  render() {
    const { items, classes, className } = this.props;
    const { anchorEl, open, selectedIndex, title } = this.state;
    const titleClasses = classNames({
      [classes.title]: true,
      [classes.selected]: selectedIndex > -1,
    });
    return (
      <div className={className}>
        <Typography
          type="button"
          onClick={this.handleClick}
          className={classes.button}
        >
          <span className={titleClasses}>
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
          onRequestClose={this.handleRequestClose}
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
  ]),
  selectedItem: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
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
  selectedItem: undefined,
  defaultTitle: undefined,
};

export const DropDownMenu = withStyles(styleSheet)(DropDownMenuBase);
