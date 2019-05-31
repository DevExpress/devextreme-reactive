import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/styles';

const styles = ({ palette, typography, spacing }) => ({
  appointment: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    overflow: 'hidden',
    boxSizing: 'border-box',
    borderRight: '1px solid transparent',
    borderBottom: '1px solid transparent',
    backgroundClip: 'padding-box',
    borderRadius: spacing(0.5),
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
  clickableAppointment: {
    cursor: 'pointer',
  },
});

const AppointmentBase = ({
  classes, className,
  children,
  data,
  onClick: handleClick,
  draggable,
  ...restProps
}) => {
  const onClick = handleClick
    ? {
      onClick: ({ target }) => {
        handleClick({ target, data });
      },
    }
    : null;
  const clickable = onClick || restProps.onDoubleClick || draggable;
  return (
    <div
      className={classNames({
        [classes.appointment]: true,
        [classes.clickableAppointment]: clickable,
      }, className)}
      {...onClick}
      {...restProps}
    >
      {children}
    </div>
  );
};

AppointmentBase.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  data: PropTypes.object,
  onClick: PropTypes.func,
  draggable: PropTypes.bool,
};

AppointmentBase.defaultProps = {
  onClick: undefined,
  className: undefined,
  data: {},
  draggable: false,
};

export const Appointment = withStyles(styles, { name: 'Appointment' })(AppointmentBase);
