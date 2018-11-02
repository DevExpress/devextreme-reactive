import * as React from 'react';
import * as PropTypes from 'prop-types';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const styles = ({ palette, spacing }) => ({
  title: {
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
    display: 'inline-block',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  content: {
    color: palette.background.default,
    padding: spacing.unit / 2,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
});

const VerticalAppointmentBase = ({
  classes,
  mapAppointmentData,
  data,
  children,
  className,
  ...restProps
}) => {
  const { title, startDate, endDate } = mapAppointmentData(data);
  return (
    children || (
      <div className={classNames(classes.content, className)} {...restProps}>
        <div className={classes.title}>
          {title}
        </div>
        <div className={classes.textContainer}>
          <div className={classes.time}>
            {moment(startDate).format('h:mm A')}
          </div>
          <div className={classes.time}>
            {' - '}
          </div>
          <div className={classes.time}>
            {moment(endDate).format('h:mm A')}
          </div>
        </div>
      </div>
    )
  );
};

VerticalAppointmentBase.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  mapAppointmentData: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
};

VerticalAppointmentBase.defaultProps = {
  children: undefined,
  mapAppointmentData: () => undefined,
  className: undefined,
};

export const VerticalAppointment = withStyles(styles, { name: 'VerticalAppointment' })(VerticalAppointmentBase);
