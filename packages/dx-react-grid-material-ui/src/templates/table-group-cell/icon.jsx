import * as React from 'react';
import * as PropTypes from 'prop-types';
import ChevronRight from '@mui/icons-material/ChevronRight';
import ExpandMore from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import classNames from 'clsx';
import withStyles from '@mui/styles/withStyles';

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
    size="large">
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
