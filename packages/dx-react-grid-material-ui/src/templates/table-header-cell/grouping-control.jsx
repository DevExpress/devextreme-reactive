import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import List from '@material-ui/icons/List';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  groupingControl: {
    paddingLeft: 0,
    height: theme.spacing.unit * 3,
    cursor: 'pointer',
  },
  disabledGroupingControl: {
    cursor: 'default',
    opacity: 0.3,
  },
});

const GroupingControlBase = ({ disabled, onGroup, classes }) => (
  <div
    onClick={(e) => {
      if (disabled) return;
      e.stopPropagation();
      onGroup(e);
    }}
    className={classNames({
      [classes.groupingControl]: true,
      [classes.disabledGroupingControl]: disabled,
    })}
  >
    <List />
  </div>
);

GroupingControlBase.propTypes = {
  onGroup: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
};

GroupingControlBase.defaultProps = {
  disabled: false,
};

export const GroupingControl = withStyles(styles, { name: 'GroupingControl' })(GroupingControlBase);
