import React, { useContext } from 'react';
import * as PropTypes from 'prop-types';
import { StyleContext } from '../layout';

export const Container = ({
  children, side, position, style, ...restProps
}) => {
  const { backgroundColor, stickyPosition } = useContext(StyleContext);

  return (
    <div
      style={{
        ...style,
        position: stickyPosition,
        [side]: position,
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
  side: PropTypes.string,
  position: PropTypes.string,
  style: PropTypes.object,
};

Container.defaultProps = {
  children: undefined,
  style: null,
  side: 'left',
  position: '',
};
