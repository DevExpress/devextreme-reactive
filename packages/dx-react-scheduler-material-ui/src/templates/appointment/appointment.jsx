import * as React from 'react';
import * as PropTypes from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const styles = ({ palette, typography, spacing }) => ({
  appointment: {
    position: 'absolute',
    display: 'block',
    overflow: 'hidden',
    backgroundColor: palette.primary[300],
    boxSizing: 'border-box',
    borderRight: `1px solid ${palette.background.paper}`,
    borderBottom: `1px solid ${palette.background.paper}`,
    ...typography.caption,
    '&:hover': {
      backgroundColor: palette.primary[400],
    },
    '&:focus': {
      backgroundColor: palette.primary[100],
      outline: 0,
    },
  },
  main: {
    padding: spacing.unit / 2,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  title: {
    color: palette.background.default,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  textContainer: {
    whiteSpace: 'pre',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  time: {
    color: palette.background.default,
    display: 'inline-block',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
});

const AppointmentBase = ({
  classes, className,
  children, getTitle,
  getStartDate, getEndDate,
  appointment, top,
  left, width,
  height,
  ...restProps
}) => (
  <div
    className={classNames(classes.appointment, className)}
    style={{
      height,
      width: `${width}%`,
      transform: `translateY(${top}px)`,
      left: `${left}%`,
    }}
    {...restProps}
  >
    {children || (
      <div className={classes.main}>
        <div className={classes.title} >
          {getTitle(appointment)}
        </div>
        <div className={classes.textContainer} >
          <div className={classes.time} >
            {moment(getStartDate(appointment)).format('h:mm A')}
          </div>
          <div className={classes.time} >-</div>
          <div className={classes.time} >
            {moment(getEndDate(appointment)).format('h:mm A')}
          </div>
        </div>
      </div>
    )}
  </div>
);

AppointmentBase.propTypes = {
  classes: PropTypes.object.isRequired,
  getTitle: PropTypes.func.isRequired,
  getStartDate: PropTypes.func.isRequired,
  getEndDate: PropTypes.func.isRequired,
  appointment: PropTypes.object.isRequired,
  top: PropTypes.number.isRequired,
  left: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
};

AppointmentBase.defaultProps = {
  className: undefined,
  children: null,
};

export const Appointment = withStyles(styles, { name: 'Appointment' })(AppointmentBase);
