import * as React from 'react';
import { styled } from '@mui/material/styles';
import * as PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import classNames from 'clsx';
import { LAYOUT_MEDIA_QUERY } from '../constants';

const PREFIX = 'TodayButton';

export const classes = {
  button: `${PREFIX}-button`,
};

const StyledButton = styled(Button)(({ theme: { spacing } }) => ({
  [`&.${classes.button}`]: {
    padding: spacing(0.8, 2),
    marginLeft: spacing(0.5),
    '&:first-of-type': {
      marginLeft: 0,
    },
    [`${LAYOUT_MEDIA_QUERY}`]: {
      fontSize: '0.75rem',
    },
  },
}));

export const TodayButton = ({
  setCurrentDate, getMessage, className, ...restProps
}) => {
  const handleClick = () => {
    setCurrentDate(new Date());
  };
  return (
    <StyledButton
      className={classNames(classes.button, className)}
      variant="outlined"
      onClick={handleClick}
      {...restProps}
    >
      {getMessage('today')}
    </StyledButton>
  );
};

TodayButton.propTypes = {
  setCurrentDate: PropTypes.func.isRequired,
  className: PropTypes.string,
  getMessage: PropTypes.func.isRequired,
};

TodayButton.defaultProps = {
  className: undefined,
};
