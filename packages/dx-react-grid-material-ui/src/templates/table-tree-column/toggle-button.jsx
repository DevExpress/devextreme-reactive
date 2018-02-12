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
  },
  placeholder: {
    display: 'inline-block',
    width: theme.spacing.unit * 6,
    marginLeft: -theme.spacing.unit,
  },
});

const ToggleButtonBase = ({
  visible, expanded, classes, onToggle,
  className,
  ...restProps
}) => (visible ? (
  <IconButton
    className={classNames(classes.button, className)}
    onClick={(e) => {
      e.stopPropagation();
      onToggle();
    }}
    {...restProps}
  >
    {
      expanded
        ? <ExpandMore />
        : <ChevronRight />
    }
  </IconButton>
) : (
  <span className={classes.placeholder} />
));

ToggleButtonBase.propTypes = {
  visible: PropTypes.bool,
  expanded: PropTypes.bool,
  onToggle: PropTypes.func,
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
};

ToggleButtonBase.defaultProps = {
  visible: false,
  expanded: false,
  onToggle: () => {},
  className: undefined,
};

export const ToggleButton = withStyles(styles)(ToggleButtonBase);
