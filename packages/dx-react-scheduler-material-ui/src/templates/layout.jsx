import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material';
import { AUTO_HEIGHT } from '@devexpress/dx-scheduler-core';
import { ContainerBase, classes } from './common/container';

const StyledContainerBase = styled(ContainerBase)({
  [`&.${classes.container}`]: {
    WebkitOverflowScrolling: 'touch',
    // NOTE: fix sticky positioning in Safari
    width: '100%',
    height: '100%',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
  },
});

export const Root = ({
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

Root.propTypes = {
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  style: PropTypes.object,
};

Root.defaultProps = {
  style: null,
};
