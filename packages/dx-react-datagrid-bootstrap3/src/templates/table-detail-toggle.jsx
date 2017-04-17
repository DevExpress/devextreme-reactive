import React from 'react';

export const TableDetailToggle = ({ style, expanded, toggleExpanded }) => (
  <td
    style={style}
    onClick={toggleExpanded}
  >
    <i className={`glyphicon glyphicon-triangle-${expanded ? 'bottom' : 'right'}`} />
  </td>
);

TableDetailToggle.propTypes = {
  expanded: React.PropTypes.bool.isRequired,
  toggleExpanded: React.PropTypes.func.isRequired,
};
