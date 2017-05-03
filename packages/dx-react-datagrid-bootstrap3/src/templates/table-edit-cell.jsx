import React from 'react';
import PropTypes from 'prop-types';

export const EditCell = ({ value, onValueChange }) => (
  <td
    style={{
      verticalAlign: 'middle',
      padding: 1,
    }}
  >
    <input
      type="text"
      className="form-control"
      value={value}
      onChange={e => onValueChange(e.target.value)}
      style={{ width: '100%' }}
    />
  </td>
);
EditCell.propTypes = {
  value: PropTypes.any,
  onValueChange: PropTypes.func.isRequired,
};
EditCell.defaultProps = {
  value: undefined,
};
