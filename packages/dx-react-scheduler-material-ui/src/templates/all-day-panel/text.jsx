import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  content: {
    height: '100%',
    position: 'relative',
  },
  text: {
    position: 'absolute',
    textAlign: 'center',
    bottom: 0,
    right: 0,
    padding: theme.spacing.unit,
    paddingBottom: theme.spacing.unit * 2.5,
    ...theme.typography.caption,
  },
});

export const TextBase = ({
  classes, getMessage, className, ...restProps
}) => (
  <div className={classNames(classes.content, className)} {...restProps}>
    <Typography className={classes.text} variant="body2">
      {getMessage('allDay')}
    </Typography>
  </div>
);

TextBase.propTypes = {
  classes: PropTypes.object.isRequired,
  getMessage: PropTypes.func.isRequired,
  className: PropTypes.string,
};

TextBase.defaultProps = {
  className: undefined,
};

export const Text = withStyles(styles, { name: 'Text' })(TextBase);
