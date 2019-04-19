import * as React from 'react';
import * as PropTypes from 'prop-types';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const styles = ({ palette, spacing }) => ({
  title: {
    fontWeight: 'bold',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  textContainer: {
    lineHeight: `${spacing.unit * 1.5}px`,
    whiteSpace: 'pre-wrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  time: {
    display: 'inline-block',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  content: {
    color: palette.common.white,
    padding: `${spacing.unit / 2}px ${spacing.unit}px`,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
});

const VerticalAppointmentBase = ({
  classes,
  data,
  children,
  className,
  dateFormat,
  ...restProps
}) => (
  children || (
    <div className={classNames(classes.content, className)} {...restProps}>
      <div className={classes.title}>
        {data.title}
      </div>
      <div className={classes.textContainer}>
        <div className={classes.time}>
          {dateFormat(data.startDate, { hour: 'numeric', minute: 'numeric' })}
        </div>
        <div className={classes.time}>
          {' - '}
        </div>
        <div className={classes.time}>
          {dateFormat(data.endDate, { hour: 'numeric', minute: 'numeric' })}
        </div>
      </div>
    </div>
  )
);

VerticalAppointmentBase.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
};

VerticalAppointmentBase.defaultProps = {
  children: undefined,
  className: undefined,
};

export const VerticalAppointment = withStyles(styles, { name: 'VerticalAppointment' })(VerticalAppointmentBase);
