import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { getAppointmentColor, getResourceColor } from '../utils';

const useStyles = makeStyles(({ palette, typography, spacing }) => ({
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
    backgroundColor: resources => getAppointmentColor(300, getResourceColor(resources), palette.primary),
    ...typography.caption,
    '&:hover': {
      backgroundColor: resources => getAppointmentColor(400, getResourceColor(resources), palette.primary),
    },
    '&:focus': {
      backgroundColor: resources => getAppointmentColor(100, getResourceColor(resources), palette.primary),
      outline: 0,
    },
  },
  clickableAppointment: {
    cursor: 'pointer',
  },
}));

const AppointmentBase = ({
  className,
  children,
  data,
  onClick: handleClick,
  draggable,
  resources,
  ...restProps
}) => {
  const onClick = handleClick
    ? {
      onClick: ({ target }) => {
        handleClick({ target });
      },
    }
    : null;
  const classes = useStyles(resources);
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
  // classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  resources: PropTypes.array,
  className: PropTypes.string,
  data: PropTypes.object,
  onClick: PropTypes.func,
  draggable: PropTypes.bool,
};

AppointmentBase.defaultProps = {
  resources: [],
  onClick: undefined,
  className: undefined,
  data: {},
  draggable: false,
};

export const Appointment = AppointmentBase;
// export const Appointment = withStyles(styles, { name: 'Appointment' })(AppointmentBase);
