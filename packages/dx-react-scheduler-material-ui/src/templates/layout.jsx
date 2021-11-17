import * as React from 'react';
import * as PropTypes from 'prop-types';
import { AUTO_HEIGHT } from '@devexpress/dx-scheduler-core';
import { ContainerBase } from './common/container';

export const Root = ({
  height, style, ...restProps
}) => {
  const containerStyle = height === AUTO_HEIGHT ? { height: '100%' } : { height: `${height}px` };

  return (
    <ContainerBase
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
