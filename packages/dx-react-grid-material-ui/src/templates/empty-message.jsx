import * as React from 'react';
import PropTypes from 'prop-types';
import { Toolbar, styled } from '@mui/material';

const PREFIX = 'EmptyMessage';
export const classes = {
  emptyMessage: `${PREFIX}-emptyMessage`,
};

const StyledBig = styled('big')(({ theme }) => ({
  [`&.${classes.emptyMessage}`]: {
    margin: '0 auto',
    padding: theme.spacing(5, 0),
    fontFamily: theme.typography.fontFamily,
    color: theme.typography.subtitle1.color,
    fontSize: theme.typography.subtitle1.fontSize,
  },
}));

export const EmptyMessage = ({
  getMessage,
  ...restProps
}) => (
  <Toolbar
    {...restProps}
  >
    <StyledBig className={classes.emptyMessage}>
      {getMessage('noColumns')}
    </StyledBig>
  </Toolbar>
);

EmptyMessage.propTypes = {
  getMessage: PropTypes.func.isRequired,
};
