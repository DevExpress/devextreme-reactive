import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { StyleContext } from './layout';

export const FixedCell = ({
  component: CellPlaceholder,
  position,
  selected,
  showLeftDivider,
  showRightDivider,
  side,
  style,
  ...restProps
}) => {
  const { backgroundColor, borderColor, stickyPosition } = useContext(StyleContext);

  return (
    <CellPlaceholder
      style={{
        backgroundClip: 'padding-box',
        backgroundColor: selected ? null : backgroundColor,
        position: stickyPosition,
        zIndex: 300,
        [side]: position,
        ...borderColor ? {
          ...showLeftDivider ? { borderLeft: `1px solid ${borderColor}` } : null,
          ...showRightDivider ? { borderRight: `1px solid ${borderColor}` } : null,
        } : null,
        ...style,
      }}
      {...restProps}
    />
  );
};

FixedCell.propTypes = {
  component: PropTypes.func.isRequired,
  position: PropTypes.number,
  selected: PropTypes.bool,
  showLeftDivider: PropTypes.bool,
  showRightDivider: PropTypes.bool,
  side: PropTypes.string.isRequired,
  style: PropTypes.object,
};

FixedCell.defaultProps = {
  position: undefined,
  selected: false,
  showLeftDivider: false,
  showRightDivider: false,
  style: null,
};
