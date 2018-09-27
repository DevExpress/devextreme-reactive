import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { getBorder } from '../utils';

const styles = theme => ({
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    position: 'relative',
  },
  content: {
    borderTop: getBorder(theme),
    borderBottom: getBorder(theme),
    height: theme.spacing.unit * 7,
    textAlign: 'right',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  text: {
    padding: theme.spacing.unit,
    ...theme.typography.caption,
  },
});

export const TitleBase = ({
  classes, getMessage, className, ...restProps
}) => (
  <div className={classNames(classes.container, className)} {...restProps}>
    <div className={classes.content}>
      <Typography className={classes.text} variant="body2">
        {getMessage('allDay')}
      </Typography>
    </div>
  </div>
);

TitleBase.propTypes = {
  classes: PropTypes.object.isRequired,
  getMessage: PropTypes.func.isRequired,
  className: PropTypes.string,
};

TitleBase.defaultProps = {
  className: undefined,
};

export const Title = withStyles(styles, { name: 'Title' })(TitleBase);
