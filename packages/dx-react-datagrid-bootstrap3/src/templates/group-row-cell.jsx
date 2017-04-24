import React from 'react';
import PropTypes from 'prop-types';

export const GroupRowCell = ({ row, isExpanded, toggleGroupExpanded }) => (
  <div onClick={toggleGroupExpanded}>
    <i className={`glyphicon glyphicon-triangle-${isExpanded ? 'bottom' : 'right'}`} /> {row.column}: {row.value}
  </div>
);

GroupRowCell.propTypes = {
  row: PropTypes.object.isRequired,
  isExpanded: PropTypes.bool,
  toggleGroupExpanded: PropTypes.func.isRequired,
};

GroupRowCell.defaultProps = {
  isExpanded: undefined,
};
