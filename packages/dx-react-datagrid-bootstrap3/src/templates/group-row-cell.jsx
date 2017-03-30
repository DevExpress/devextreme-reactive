import React from 'react';

export const GroupRowCell = ({ row, isExpanded, toggleGroupExpanded }) => (
  <div onClick={toggleGroupExpanded}>
    <i className={`glyphicon glyphicon-triangle-${isExpanded ? 'bottom' : 'right'}`} /> {row.column}: {row.value}
  </div>
);

GroupRowCell.propTypes = {
  row: React.PropTypes.object.isRequired,
  isExpanded: React.PropTypes.bool,
  toggleGroupExpanded: React.PropTypes.func.isRequired,
};

GroupRowCell.defaultProps = {
  isExpanded: undefined,
};
