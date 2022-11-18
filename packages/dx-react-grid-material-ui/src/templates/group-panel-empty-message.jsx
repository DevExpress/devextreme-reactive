import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'clsx';
import { styled } from '@mui/material/styles';

const PREFIX = 'GroupPanelEmptyMessage';
export const classes = {
  groupInfo: `${PREFIX}-groupInfo`,
};

const StyledDiv = styled('div')(({ theme }) => ({
  [`&.${classes.groupInfo}`]: {
    color: theme.typography.caption.color,
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.fontSize,
  },
}));

export const GroupPanelEmptyMessage = ({
  getMessage,
  className,
  forwardedRef,
  ...restProps
}) => (
  <StyledDiv
    ref={forwardedRef}
    className={classNames(classes.groupInfo, className)}
    {...restProps}
  >
    {getMessage('groupByColumn')}
  </StyledDiv>
);

GroupPanelEmptyMessage.propTypes = {
  getMessage: PropTypes.func.isRequired,
  className: PropTypes.string,
  forwardedRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

GroupPanelEmptyMessage.defaultProps = {
  className: undefined,
  forwardedRef: undefined,
};
