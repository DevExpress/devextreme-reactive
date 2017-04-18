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
  style: React.PropTypes.shape(),
  expanded: React.PropTypes.bool,
  toggleExpanded: React.PropTypes.func,
};

TableDetailToggle.defaultProps = {
  style: null,
  expanded: false,
  toggleExpanded: () => {},
};
