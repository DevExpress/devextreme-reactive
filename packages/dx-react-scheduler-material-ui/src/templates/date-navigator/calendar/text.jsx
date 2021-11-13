import * as React from 'react';
import { styled } from '@mui/material/styles';
import * as PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import classNames from 'clsx';
import { MONTH_YEAR_OPTIONS } from '@devexpress/dx-scheduler-core';

const PREFIX = 'Text';

export const classes = {
  text: `${PREFIX}-text`,
};

const StyledTypography = styled(Typography)({
  [`& .${classes.text}`]: {
    userSelect: 'none',
    flex: 1,
    textAlign: 'center',
  },
});

const TextBase = ({
  className,
  currentDate,
  formatDate,
  ...restProps
}) => (
  <StyledTypography
    variant="h6"
    className={classNames({
      [classes.text]: true,
    }, className)}
    {...restProps}
  >
    {formatDate(currentDate, MONTH_YEAR_OPTIONS)}
  </StyledTypography>
);

TextBase.propTypes = {
  currentDate: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]).isRequired,
  formatDate: PropTypes.func.isRequired,
  className: PropTypes.string,
};

TextBase.defaultProps = {
  className: undefined,
};

export const Text = (TextBase);
