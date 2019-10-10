import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import { setColor } from '../utils';

const styles = ({ palette, typography, spacing }) => ({
  appointment: {
    userSelect: 'none',
    position: 'absolute',
    height: '100%',
    width: '100%',
    overflow: 'hidden',
    boxSizing: 'border-box',
    // fix no space between appointments bug in Firefox (https://bugzilla.mozilla.org/show_bug.cgi?id=989340)
    borderRight: '2px solid transparent',
    borderBottom: '1px solid transparent',
    backgroundClip: 'padding-box',
    borderRadius: spacing(0.5),
    backgroundColor: setColor(300, palette.primary),
    ...typography.caption,
    '&:hover': {
      backgroundColor: setColor(400, palette.primary),
    },
    '&:focus': {
      backgroundColor: setColor(100, palette.primary),
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
