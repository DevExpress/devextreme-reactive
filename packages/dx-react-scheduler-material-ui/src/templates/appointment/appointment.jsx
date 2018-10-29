import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const styles = ({ palette, typography, spacing }) => ({
  appointment: {
    overflow: 'hidden',
    boxSizing: 'border-box',
    borderRight: '1px solid transparent',
    borderBottom: '1px solid transparent',
    backgroundClip: 'padding-box',
    backgroundColor: palette.primary[300],
    ...typography.caption,
    '&:hover': {
      backgroundColor: palette.primary[400],
    },
    '&:focus': {
      backgroundColor: palette.primary[100],
      outline: 0,
    },
  },
  content: {
    color: palette.background.default,
    padding: spacing.unit / 2,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
});

const AppointmentBase = ({
  classes, className,
  style,
  children,
  data,
  onClick: handleClick,
  ...restProps
}) => {
  const onClick = handleClick
    ? {
      onClick: ({ target }) => {
        handleClick({ target, data });
      },
    }
    : null;
  return (
    <div
      className={classNames(classes.appointment, className)}
      style={style}
      {...onClick}
      {...restProps}
    >
      <div className={classes.content}>
        {children}
      </div>
    </div>
  );
};

AppointmentBase.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  style: PropTypes.object.isRequired,
  className: PropTypes.string,
  data: PropTypes.object,
  onClick: PropTypes.func,
};

AppointmentBase.defaultProps = {
  onClick: undefined,
  className: undefined,
  data: {},
};

export const Appointment = withStyles(styles, { name: 'Appointment' })(AppointmentBase);
