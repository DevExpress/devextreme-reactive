import * as React from 'react';
import { styled } from "@mui/material";
import * as PropTypes from 'prop-types';
import classNames from 'clsx';

const PREFIX = 'Indicator';

export const classes = {
  line: `${PREFIX}-line`,
  circle: `${PREFIX}-circle`,
  nowIndicator: `${PREFIX}-nowIndicator`,
};

const StyledDiv = styled('div')(({ theme, topValue }) => ({
  [`& .${classes.line}`]: {
    height: '2px',
    width: '100%',
    transform: 'translate(0, -1px)',
  },

  [`& .${classes.circle}`]: {
    width: theme.spacing(1.5),
    height: theme.spacing(1.5),
    borderRadius: '50%',
    transform: 'translate(-50%, -50%)',
  },

  [`& .${classes.nowIndicator}`]: {
    position: 'absolute',
    left: 0,
    top: topValue,
    background: theme.palette.secondary.main,
    zIndex: 1,
  },
}));

export const Indicator = props => (
  <StyledDiv {...props}>
    <div className={classNames(classes.nowIndicator, classes.circle)} />
    <div className={classNames(classes.nowIndicator, classes.line)} />
  </StyledDiv>
);

Indicator.propTypes = {
  top: PropTypes.string,
};

Indicator.defaultProps = {
  top: 0,
};
