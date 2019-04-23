import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const hourMinute = { hour: 'numeric', minute: 'numeric' };

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
    display: 'flex',
  },
  container: {
    width: '100%',
  },
  recurringContainer: {
    width: `calc(100% - ${spacing.unit * 2}px)`,
  },
  imageContainer: {
    width: `${spacing.unit * 2}px`,
    height: `${spacing.unit * 2}px`,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

const VerticalAppointmentBase = ({
  classes,
  data,
  children,
  className,
  dateFormat,
  recurringIconComponent: RecurringIcon,
  ...restProps
}) => {
  const repeat = !!data.rRule;
  return (
    children || (
    <div className={classNames(classes.content, className)} {...restProps}>
      <div className={repeat ? classes.recurringContainer : classes.container}>
        <div className={classes.title}>
          {data.title}
        </div>
        <div className={classes.textContainer}>
          <div className={classes.time}>
            {dateFormat(data.startDate, hourMinute)}
          </div>
          <div className={classes.time}>
            {' - '}
          </div>
          <div className={classes.time}>
            {dateFormat(data.endDate, hourMinute)}
          </div>
        </div>
      </div>
      {repeat ? (
        <div className={classes.imageContainer}>
          <RecurringIcon className={classes.image} />
        </div>
      ) : undefined}
    </div>
    )
  );
};

VerticalAppointmentBase.propTypes = {
  recurringIconComponent: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
  dateFormat: PropTypes.func,
};

VerticalAppointmentBase.defaultProps = {
  dateFormat: () => '',
  children: undefined,
  className: undefined,
};

export const VerticalAppointment = withStyles(styles, { name: 'VerticalAppointment' })(VerticalAppointmentBase);
