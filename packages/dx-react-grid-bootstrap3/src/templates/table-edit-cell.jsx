import React from 'react';
import PropTypes from 'prop-types';

export const EditCell = ({ column, value, onValueChange, style }) => (
  <td
    style={{
      verticalAlign: 'middle',
      padding: '1px',
      ...style,
    }}
  >
    <input
      type="text"
      className="form-control"
      value={value}
      onChange={e => onValueChange(e.target.value)}
      style={{ width: '100%', textAlign: column.align }}
    />
  </td>
);
EditCell.propTypes = {
  column: PropTypes.object,
  value: PropTypes.any,
  onValueChange: PropTypes.func.isRequired,
  style: PropTypes.object,
};
EditCell.defaultProps = {
  column: {},
  value: '',
  style: {},
};
