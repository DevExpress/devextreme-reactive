import * as React from 'react';
import * as PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import withStyles from '@mui/styles/withStyles';

const styles = theme => ({
  emptyMessage: {
    margin: '0 auto',
    padding: theme.spacing(5, 0),
    fontFamily: theme.typography.fontFamily,
    color: theme.typography.subtitle1.color,
    fontSize: theme.typography.subtitle1.fontSize,
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
