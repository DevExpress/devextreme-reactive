import React from 'react';
import PropTypes from 'prop-types';

export const EditCell = ({
  column, value, onValueChange, style, children,
}) => (
  <td
    style={{
      verticalAlign: 'middle',
      padding: '1px',
      ...style,
    }}
  >
    {children || (
      <input
        type="text"
        className="form-control"
        value={value}
        onChange={e => onValueChange(e.target.value)}
        style={{ width: '100%', textAlign: column.align }}
      />
    )}
  </td>
);
EditCell.propTypes = {
  column: PropTypes.object,
  value: PropTypes.any,
  onValueChange: PropTypes.func.isRequired,
  style: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};
EditCell.defaultProps = {
  column: {},
  value: '',
  style: {},
  children: undefined,
};
