import * as React from 'react';
import * as PropTypes from 'prop-types';
import List from 'material-ui-icons/List';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  groupingControl: {
    cursor: 'pointer',
    paddingLeft: 0,
    height: theme.spacing.unit * 3,
  },
});

const GroupingControlBase = ({ onGroup, classes }) => (
  <div
    onClick={(e) => {
      e.stopPropagation();
      onGroup(e);
    }}
    className={classes.groupingControl}
  >
    <List />
  </div>
);

GroupingControlBase.propTypes = {
  onGroup: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export const GroupingControl = withStyles(styles, { name: 'GroupingControl' })(GroupingControlBase);
