import * as React from 'react';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import classNames from 'clsx';

const PREFIX = 'HorizontalAppointment';

export const classes = {
  title: `${PREFIX}-title`,
  content: `${PREFIX}-content`,
  container: `${PREFIX}-container`,
  recurringContainer: `${PREFIX}-recurringContainer`,
  imageContainer: `${PREFIX}-imageContainer`,
  image: `${PREFIX}-image`,
};

const StyledDiv = styled('div')(({ theme: { palette, spacing } }) => ({
  [`& .${classes.title}`]: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  [`&.${classes.content}`]: {
    color: palette.common.white,
    padding: spacing(0.5),
    paddingTop: spacing(0.125),
    paddingLeft: spacing(0.75),
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    display: 'flex',
  },
  [`& .${classes.container}`]: {
    width: '100%',
  },
  [`& .${classes.recurringContainer}`]: {
    width: `calc(100% - ${spacing(2)})`,
  },
  [`& .${classes.imageContainer}`]: {
    width: spacing(2),
    height: spacing(2),
  },
  [`& .${classes.image}`]: {
    width: '100%',
    height: '100%',
  },
}));

export const HorizontalAppointment = ({
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
    <StyledDiv className={classNames(classes.content, className)} {...restProps}>
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
    </StyledDiv>
  );
};

HorizontalAppointment.propTypes = {
  // oneOfType is a workaround because withStyles returns react object
  recurringIconComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  data: PropTypes.object.isRequired,
  durationType: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  formatDate: PropTypes.func,
};

HorizontalAppointment.defaultProps = {
  formatDate: () => '',
  children: undefined,
  className: undefined,
  durationType: undefined,
};
