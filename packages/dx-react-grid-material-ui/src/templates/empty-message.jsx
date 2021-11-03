import * as React from 'react';
import * as PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import { styled } from '@mui/material/styles';

const PREFIX = 'EmotyMessage';
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
