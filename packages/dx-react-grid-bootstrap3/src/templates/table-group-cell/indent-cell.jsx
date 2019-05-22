import React, { useState, useContext } from 'react';
import * as PropTypes from 'prop-types';
import { getStickyPosition } from '../../utils/css-fallback-properties';
import { ThemeColors } from '../layout';

export const IndentCell = ({
  left,
  tableRow,
  tableColumn,
  row, column,
  style,
  ...restProps
}) => {
  const [position] = useState(getStickyPosition());
  const { backgroundColor } = useContext(ThemeColors);

  return (
    <td
      style={{
        ...style,
        position,
        left,
        backgroundColor,
        backgroundClip: 'padding-box',
        zIndex: 300,
      }}
      {...restProps}
    />
  );
};

IndentCell.propTypes = {
  left: PropTypes.string,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
  row: PropTypes.any,
  column: PropTypes.object,
  style: PropTypes.object,
};

IndentCell.defaultProps = {
  left: '',
  tableRow: undefined,
  tableColumn: undefined,
  row: {},
  column: {},
  style: null,
};
