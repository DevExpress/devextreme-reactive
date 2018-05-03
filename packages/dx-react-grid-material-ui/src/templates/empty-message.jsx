import * as React from 'react';
import * as PropTypes from 'prop-types';
import Toolbar from 'material-ui/Toolbar';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  emptyMessage: {
    margin: '0 auto',
    padding: `${theme.spacing.unit * 5}px 0`,
    fontFamily: theme.typography.fontFamily,
    color: theme.typography.subheading.color,
    fontSize: theme.typography.subheading.fontSize,
  },
});

export const EmptyMessageBase = ({
  getMessage,
  classes,
  ...restProps
}) => (
  <Toolbar
    {...restProps}
  >
    <big className={classes.emptyMessage}>
      {getMessage('noColumns')}
    </big>
  </Toolbar>
);

EmptyMessageBase.propTypes = {
  getMessage: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export const EmptyMessage = withStyles(styles, { name: 'EmptyMessage' })(EmptyMessageBase);
