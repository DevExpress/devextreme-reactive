import React, { useState, useContext } from 'react';
import * as PropTypes from 'prop-types';
import { getStickyPosition } from '../../utils/css-fallback-properties';
import { ThemeColors } from '../layout';

export const Container = ({ children, style, ...restProps }) => {
  const [position] = useState(getStickyPosition());
  const { backgroundColor } = useContext(ThemeColors);

  return (
    <div
      style={{
        ...style,
        position,
        backgroundColor,
        backgroundClip: 'padding-box',
        zIndex: 300,
        display: 'inline-block',
      }}
      {...restProps}
    >
      {children}
    </div>
  );
};

Container.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
};

Container.defaultProps = {
  children: undefined,
  style: null,
};
