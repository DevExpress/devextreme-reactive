import * as React from 'react';
import { styled } from '@mui/material';
import PropTypes from 'prop-types';
import classNames from 'clsx';
import { HOUR_MINUTE_OPTIONS } from '@devexpress/dx-scheduler-core';
import { SPACING_LABEL_HEIGHT } from '../../../constants';

const PREFIX = 'Label';

export const classes = {
  label: `${PREFIX}-label`,
  text: `${PREFIX}-text`,
  emptyLabel: `${PREFIX}-emptyLabel`,
};

const StyledDiv = styled('div')(({ theme }) => ({
  [`&.${classes.label}`]: {
    userSelect: 'none',
    border: 0,
    height: theme.spacing(SPACING_LABEL_HEIGHT),
    lineHeight: theme.spacing(SPACING_LABEL_HEIGHT),
    padding: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    textAlign: 'right',
    paddingLeft: theme.spacing(0.25),
    paddingRight: theme.spacing(1),
  },
  [`& .${classes.text}`]: {
    ...theme.typography.caption,
    fontSize: '0.7rem',
    whiteSpace: 'nowrap',
    color: theme.palette.text.secondary,
  },
  [`&.${classes.emptyLabel}`]: {
    height: theme.spacing(SPACING_LABEL_HEIGHT / 2),
    '&:last-child': {
      height: `calc(${theme.spacing(SPACING_LABEL_HEIGHT / 2)} - 1px)`,
    },
  },
}));

export const Label = ({
  className,
  time,
  formatDate,
  groupingInfo,
  endOfGroup,
  ...restProps
}) => (
  <StyledDiv
    className={classNames({
      [classes.label]: true,
      [classes.emptyLabel]: !time,
    }, className)}
    {...restProps}
  >
    {time && (
      <span className={classes.text}>
        {formatDate(time, HOUR_MINUTE_OPTIONS)}
      </span>
    )}

  </StyledDiv>
);

Label.propTypes = {
  formatDate: PropTypes.func,
  time: PropTypes.instanceOf(Date),
  groupingInfo: PropTypes.arrayOf(PropTypes.object),
  endOfGroup: PropTypes.bool,
  className: PropTypes.string,
};

Label.defaultProps = {
  className: undefined,
  time: undefined,
  formatDate: () => undefined,
  groupingInfo: undefined,
  endOfGroup: false,
};
