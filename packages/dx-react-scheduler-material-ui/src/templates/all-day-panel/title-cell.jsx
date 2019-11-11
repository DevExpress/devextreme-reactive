import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { getBorder } from '../utils';

const styles = theme => ({
  container: {
    userSelect: 'none',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    position: 'relative',
  },
  content: {
    borderBottom: getBorder(theme),
    height: theme.spacing(5.75),
    textAlign: 'right',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  title: {
    paddingRight: theme.spacing(2),
    ...theme.typography.caption,
    color: theme.palette.text.secondary,
  },
});

export const TitleCellBase = React.memo(({
  classes, getMessage, className, ...restProps
}) => (
  <div className={classNames(classes.container, className)} {...restProps}>
    <div className={classes.content}>
      <Typography className={classes.title} variant="body1">
        {getMessage('allDay')}
      </Typography>
    </div>
  </div>
));

TitleCellBase.propTypes = {
  classes: PropTypes.object.isRequired,
  getMessage: PropTypes.func.isRequired,
  className: PropTypes.string,
};

TitleCellBase.defaultProps = {
  className: undefined,
};

export const TitleCell = withStyles(styles, { name: 'TitleCell' })(TitleCellBase);
