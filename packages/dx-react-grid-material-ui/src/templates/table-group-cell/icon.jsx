import * as React from 'react';
import * as PropTypes from 'prop-types';
import ChevronRight from '@material-ui/icons/ChevronRight';
import ExpandMore from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import classNames from 'clsx';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  groupButton: {
    verticalAlign: 'middle',
    display: 'inline-block',
    padding: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
});

const IconBase = React.memo(({
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
));

IconBase.propTypes = {
  expanded: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

IconBase.defaultProps = {
  className: undefined,
};

export const Icon = withStyles(styles)(IconBase);
