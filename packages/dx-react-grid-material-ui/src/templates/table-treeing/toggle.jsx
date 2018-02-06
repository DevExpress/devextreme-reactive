import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';

import ChevronRight from 'material-ui-icons/ChevronRight';
import ExpandMore from 'material-ui-icons/ExpandMore';
import IconButton from 'material-ui/IconButton';

const styles = theme => ({
  button: {
    marginTop: '-5px',
    marginBottom: '-5px',
    marginRight: theme.spacing.unit,
  },
  placeholder: {
    display: 'inline-block',
    width: theme.spacing.unit * 6,
    marginRight: theme.spacing.unit,
  },
});

const ToggleBase = ({
  disabled, expanded, classes, onToggle,
  className,
  ...restProps
}) => (disabled ? (
  <span className={classes.placeholder} />
) : (
  <IconButton
    disabled={disabled}
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
));

ToggleBase.propTypes = {
  disabled: PropTypes.bool,
  expanded: PropTypes.bool,
  onToggle: PropTypes.func,
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
};

ToggleBase.defaultProps = {
  disabled: false,
  expanded: false,
  onToggle: () => {},
  className: undefined,
};

export const Toggle = withStyles(styles)(ToggleBase);
