import * as React from 'react';
import { styled } from '@mui/material/styles';
import * as PropTypes from 'prop-types';
import { AUTO_HEIGHT } from '@devexpress/dx-scheduler-core';
import { ContainerBase } from './common/container';

const PREFIX = 'Root';

const classes = {
  container: `${PREFIX}-container`,
};

const StyledContainerBase = styled(ContainerBase)({
  [`& .${classes.container}`]: {
    WebkitOverflowScrolling: 'touch',
    // NOTE: fix sticky positioning in Safari
    width: '100%',
    height: '100%',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
  },
});

export const LayoutBase = ({
  height, style, ...restProps
}) => {
  const containerStyle = height === AUTO_HEIGHT ? { height: '100%' } : { height: `${height}px` };

  return (
    <StyledContainerBase
      style={{ ...containerStyle, ...style }}
      {...restProps}
    />
  );
};

LayoutBase.propTypes = {
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  style: PropTypes.object,
};

LayoutBase.defaultProps = {
  style: null,
};

export const Root = (LayoutBase);
