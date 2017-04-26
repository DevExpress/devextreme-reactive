import React from 'react';

export const TableDetailToggle = ({ style, expanded, toggleExpanded }) => (
  <td
    style={{
      cursor: 'pointer',
      ...style,
    }}
    onClick={(e) => {
      e.stopPropagation();
      toggleExpanded();
    }}
  >
    <i
      className={`glyphicon glyphicon-triangle-${expanded ? 'bottom' : 'right'}`}
      style={{
        fontSize: '9px',
        top: '0',
      }}
    />
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
