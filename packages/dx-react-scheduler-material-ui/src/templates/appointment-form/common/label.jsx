import * as React from 'react';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import classNames from 'clsx';
import { TITLE, ORDINARY_LABEL } from '@devexpress/dx-scheduler-core';

const PREFIX = 'Label';

export const classes = {
  label: `${PREFIX}-label`,
  titleLabel: `${PREFIX}-titleLabel`,
};

const StyledTypography = styled(Typography)(({ theme }) => ({
  [`&.${classes.label}`]: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  [`&.${classes.titleLabel}`]: {
    fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.typography.fontSize + 5,
    paddingBottom: theme.spacing(1),
  },
}));

export const Label = React.memo(({
  text,
  className,
  type,
  ...restProps
}) => (
  <StyledTypography
    className={classNames({
      [classes.label]: true,
      [classes.titleLabel]: type === TITLE,
    }, className)}
    {...restProps}
  >
    {text}
  </StyledTypography>
));

Label.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
};

Label.defaultProps = {
  text: undefined,
  className: undefined,
  type: ORDINARY_LABEL,
};
