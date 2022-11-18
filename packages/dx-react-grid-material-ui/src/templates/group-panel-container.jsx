import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'clsx';
import { styled } from '@mui/material/styles';

const PREFIX = 'GroupPanelContainer';
export const classes = {
  panel: `${PREFIX}-panel`,
};

const StyledDiv = styled('div')(({ theme }) => ({
  [`&.${classes.panel}`]: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    marginTop: theme.spacing(1.5),
  },
}));

export const GroupPanelContainer = ({
  children,
  className,
  forwardedRef,
  ...restProps
}) => (
  <StyledDiv
    ref={forwardedRef}
    className={classNames(classes.panel, className)}
    {...restProps}
  >
    {children}
  </StyledDiv>
);

GroupPanelContainer.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  forwardedRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

GroupPanelContainer.defaultProps = {
  children: undefined,
  className: undefined,
  forwardedRef: undefined,
};
