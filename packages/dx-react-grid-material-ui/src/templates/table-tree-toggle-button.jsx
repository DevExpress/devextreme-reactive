import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';

import ChevronRight from 'material-ui-icons/ChevronRight';
import ExpandMore from 'material-ui-icons/ExpandMore';
import IconButton from 'material-ui/IconButton';

const styles = theme => ({
  button: {
    marginTop: -theme.spacing.unit,
    marginBottom: -theme.spacing.unit,
    marginLeft: -theme.spacing.unit,
    marginRight: theme.spacing.unit * 2,
  },
  hidden: {
    opacity: 0,
  },
});

const TableTreeToggleButtonBase = ({
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
    {...restProps}
  >
    {expanded
      ? <ExpandMore />
      : <ChevronRight />}
  </IconButton>
);

TableTreeToggleButtonBase.propTypes = {
  visible: PropTypes.bool,
  expanded: PropTypes.bool,
  onToggle: PropTypes.func,
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
};

TableTreeToggleButtonBase.defaultProps = {
  visible: false,
  expanded: false,
  onToggle: () => {},
  className: undefined,
};

export const TableTreeToggleButton = withStyles(styles)(TableTreeToggleButtonBase);
