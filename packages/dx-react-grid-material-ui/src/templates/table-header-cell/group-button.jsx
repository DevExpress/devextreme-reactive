import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import List from '@mui/icons-material/List';
import withStyles from '@mui/styles/withStyles';

const styles = theme => ({
  root: {
    paddingLeft: 0,
    height: theme.spacing(3),
    cursor: 'pointer',
  },
  disabled: {
    cursor: 'default',
    opacity: 0.3,
  },
});

const GroupButtonBase = ({
  disabled, onGroup, classes, className, ...restProps
}) => (
  <div
    onClick={(e) => {
      if (disabled) return;
      e.stopPropagation();
      onGroup(e);
    }}
    className={classNames({
      [classes.root]: true,
      [classes.disabled]: disabled,
    }, className)}
    {...restProps}
  >
    <List />
  </div>
);

GroupButtonBase.propTypes = {
  onGroup: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

GroupButtonBase.defaultProps = {
  disabled: false,
  className: undefined,
};

export const GroupButton = withStyles(styles, { name: 'GroupButton' })(GroupButtonBase);
