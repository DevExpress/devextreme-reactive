import React from 'react';

export const GroupRowCell = ({ style, colspan, row, isExpanded, toggleGroupExpanded }) => (
  <td
    colSpan={colspan}
    style={style}
    onClick={toggleGroupExpanded}
  >
    <i className={`glyphicon glyphicon-triangle-${isExpanded ? 'bottom' : 'right'}`} /> {row.column}: {row.value}
  </td>
);

GroupRowCell.propTypes = {
  row: React.PropTypes.object.isRequired,
  isExpanded: React.PropTypes.bool,
  toggleGroupExpanded: React.PropTypes.func.isRequired,
};

GroupRowCell.defaultProps = {
  isExpanded: undefined,
};
