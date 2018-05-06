import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';

import ChevronRight from '@material-ui/icons/ChevronRight';
import ExpandMore from '@material-ui/icons/ExpandMore';
import IconButton from 'material-ui/IconButton';

const styles = theme => ({
  button: {
    marginTop: '-1px',
    marginBottom: '-1px',
    marginLeft: -theme.spacing.unit,
    marginRight: theme.spacing.unit * 2,
    width: theme.spacing.unit * 5,
    height: theme.spacing.unit * 5,
  },
  hidden: {
    cursor: 'default',
    opacity: 0,
  },
});

const TableTreeExpandButtonBase = ({
  visible, expanded, classes, onToggle,
  className,
  ...restProps
}) => (
  <IconButton
    className={classNames({
      [classes.button]: true,
      [classes.hidden]: !visible,
    }, className)}
    onClick={(e) => {
      if (!visible) return;
      e.stopPropagation();
      onToggle();
    }}
    tabIndex={visible ? 0 : -1}
    {...restProps}
  >
    {expanded
      ? <ExpandMore />
      : <ChevronRight />}
  </IconButton>
);

TableTreeExpandButtonBase.propTypes = {
  visible: PropTypes.bool,
  expanded: PropTypes.bool,
  onToggle: PropTypes.func,
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
};

TableTreeExpandButtonBase.defaultProps = {
  visible: false,
  expanded: false,
  onToggle: () => {},
  className: undefined,
};

export const TableTreeExpandButton = withStyles(styles)(TableTreeExpandButtonBase);
