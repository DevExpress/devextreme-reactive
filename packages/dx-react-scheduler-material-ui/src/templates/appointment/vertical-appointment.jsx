import * as React from 'react';
import * as PropTypes from 'prop-types';
import withStyles from '@mui/styles/withStyles';
import classNames from 'clsx';
import { HOUR_MINUTE_OPTIONS } from '@devexpress/dx-scheduler-core';
import { SMALL_LAYOUT_MEDIA_QUERY } from '../constants';
import { addCommaAndSpaceToString } from '../utils';

const styles = ({ palette, spacing }) => ({
  title: {
    fontWeight: 'bold',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  textContainer: {
    lineHeight: 1,
    whiteSpace: 'pre-wrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  middleContainer: {
    lineHeight: '0.9!important',
  },
  time: {
    display: 'inline-block',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  content: {
    color: palette.common.white,
    padding: spacing(0.5, 1),
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    display: 'flex',
    [`${SMALL_LAYOUT_MEDIA_QUERY}`]: {
      paddingLeft: spacing(0.5),
      paddingRight: spacing(0.5),
    },
  },
  shortContent: {
    padding: spacing(0.25, 1),
    [`${SMALL_LAYOUT_MEDIA_QUERY}`]: {
      paddingLeft: spacing(0.5),
      paddingRight: spacing(0.5),
    },
  },
  shortContainer: {
    display: 'flex',
  },
  shortTime: {
    textOverflow: 'initial',
    flexShrink: 0,
  },
  shortTitle: {
    flexShrink: 3,
  },
  container: {
    width: '100%',
  },
  recurringContainer: {
    width: `calc(100% - ${spacing(2)})`,
  },
  imageContainer: {
    width: spacing(2),
    height: spacing(2),
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
  formatDate,
  recurringIconComponent: RecurringIcon,
  durationType,
  ...restProps
}) => {
  const repeat = !!data.rRule;
  const isShortHeight = durationType === 'short';
  const isMiddleHeight = durationType === 'middle';
  return (
    <div
      className={classNames({
        [classes.content]: true,
        [classes.shortContent]: isShortHeight || isMiddleHeight,
      }, className)}
      {...restProps}
    >
      {children || (
        <React.Fragment>
          <div className={classNames({
            [classes.container]: !repeat,
            [classes.recurringContainer]: repeat,
          })}
          >
            {isShortHeight ? (
              <div className={classes.shortContainer}>
                <div className={classNames(classes.title, classes.shortTitle)}>
                  {addCommaAndSpaceToString(data.title)}
                </div>
                <div className={classNames(classes.time, classes.shortTime)}>
                  {formatDate(data.startDate, HOUR_MINUTE_OPTIONS)}
                </div>
              </div>
            ) : (
              <React.Fragment>
                <div className={classes.title}>
                  {data.title}
                </div>
                <div
                  className={classNames({
                    [classes.textContainer]: true,
                    [classes.middleContainer]: isMiddleHeight,
                  })}
                >
                  <div className={classes.time}>
                    {formatDate(data.startDate, HOUR_MINUTE_OPTIONS)}
                  </div>
                  <div className={classes.time}>
                    &nbsp;
                    -
                    &nbsp;
                  </div>
                  <div className={classes.time}>
                    {formatDate(data.endDate, HOUR_MINUTE_OPTIONS)}
                  </div>
                </div>
              </React.Fragment>
            )}
          </div>
          {repeat ? (
            <div className={classes.imageContainer}>
              <RecurringIcon className={classes.image} />
            </div>
          ) : undefined}
        </React.Fragment>
      )}
    </div>
  );
};

VerticalAppointmentBase.propTypes = {
  // oneOfType is a workaround because withStyles returns react object
  recurringIconComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  formatDate: PropTypes.func.isRequired,
  durationType: PropTypes.string.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
};

VerticalAppointmentBase.defaultProps = {
  children: undefined,
  className: undefined,
};

export const VerticalAppointment = withStyles(styles, { name: 'VerticalAppointment' })(VerticalAppointmentBase);
