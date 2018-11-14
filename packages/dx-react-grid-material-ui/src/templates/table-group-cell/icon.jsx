import * as React from 'react';
import * as PropTypes from 'prop-types';
import ChevronRight from '@material-ui/icons/ChevronRight';
import ExpandMore from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  groupButton: {
    verticalAlign: 'middle',
    display: 'inline-block',
    padding: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});

const IconBase = ({
  expanded,
  classes,
  className,
  ...restProps
}) => (
  <IconButton
    className={classNames(classes.groupButton, className)}
    {...restProps}
  >
    {
      expanded
        ? <ExpandMore />
        : <ChevronRight />
    }
  </IconButton>
);

IconBase.propTypes = {
  expanded: PropTypes.bool,
  className: PropTypes.string,
};

IconBase.defaultProps = {
  expanded: false,
  className: undefined,
};

export const Icon = withStyles(styles)(IconBase);
