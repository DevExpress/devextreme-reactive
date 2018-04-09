import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import List from '@material-ui/icons/List';
import { withStyles } from 'material-ui/styles';

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
  floatLeft: {
    float: 'left',
    textAlign: 'left',
  },
  floatRight: {
    float: 'right',
    textAlign: 'right',
  },
});

const GroupingControlBase = ({
  align,
  onGroup,
  disabled,
  classes,
}) => {
  const invertedAlign = align === 'left' ? 'right' : 'left';
  const groupingControlClasses = classNames({
    [classes.groupingControl]: true,
    [classes.disabledGroupingControl]: disabled,
    [classes.floatLeft]: invertedAlign === 'left',
    [classes.floatRight]: invertedAlign === 'right',
  });

  return (
    <div
      onClick={(e) => {
        if (disabled) return;
        e.stopPropagation();
        onGroup(e);
      }}
      className={groupingControlClasses}
    >
      <List />
    </div>
  );
};

GroupingControlBase.propTypes = {
  align: PropTypes.string.isRequired,
  onGroup: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
};

GroupingControlBase.defaultProps = {
  disabled: false,
};

export const GroupingControl = withStyles(styles, { name: 'GroupingControl' })(GroupingControlBase);
