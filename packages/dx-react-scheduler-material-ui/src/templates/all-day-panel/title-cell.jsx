import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import Typography from '@mui/material/Typography';
import withStyles from '@mui/styles/withStyles';
import { VIEW_TYPES } from '@devexpress/dx-scheduler-core';
import { SPACING_CELL_HEIGHT } from '../constants';

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
    width: theme.spacing(10),
    boxSizing: 'border-box',
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
  fixedHeight: {
    height: theme.spacing(SPACING_CELL_HEIGHT[VIEW_TYPES.ALL_DAY_PANEL]),
    width: '100%',
  },
});

export const TitleCellBase = React.memo(({
  classes, getMessage, className, fixedHeight, ...restProps
}) => (
  <div
    className={classNames({
      [classes.container]: true,
      [classes.fixedHeight]: fixedHeight,
    }, className)}
    {...restProps}
  >
    <div
      className={classNames({
        [classes.content]: true,
        [classes.fixedHeight]: fixedHeight,
      }, className)}
    >
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
  fixedHeight: PropTypes.bool,
};

TitleCellBase.defaultProps = {
  className: undefined,
  fixedHeight: false,
};

export const TitleCell = withStyles(styles, { name: 'TitleCell' })(TitleCellBase);
