import * as React from 'react';
import * as PropTypes from 'prop-types';
import withStyles from '@mui/styles/withStyles';
import classNames from 'clsx';

const styles = ({ palette, spacing }) => ({
  title: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  content: {
    color: palette.common.white,
    padding: spacing(0.5),
    paddingTop: spacing(0.125),
    paddingLeft: spacing(0.75),
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    display: 'flex',
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

const HorizontalAppointmentBase = ({
  classes,
  data,
  children,
  className,
  recurringIconComponent: RecurringIcon,
  formatDate,
  durationType,
  ...restProps
}) => {
  const repeat = !!data.rRule;
  return (
    <div className={classNames(classes.content, className)} {...restProps}>
      {children || (
        <React.Fragment>
          <div className={repeat ? classes.recurringContainer : classes.container}>
            <div className={classes.title}>
              {data.title}
            </div>
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

HorizontalAppointmentBase.propTypes = {
  // oneOfType is a workaround because withStyles returns react object
  recurringIconComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  durationType: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  formatDate: PropTypes.func,
};

HorizontalAppointmentBase.defaultProps = {
  formatDate: () => '',
  children: undefined,
  className: undefined,
  durationType: undefined,
};

export const HorizontalAppointment = withStyles(styles, { name: 'HorizontalAppointment' })(HorizontalAppointmentBase);
