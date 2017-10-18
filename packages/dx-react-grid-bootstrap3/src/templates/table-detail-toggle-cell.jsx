import React from 'react';
import PropTypes from 'prop-types';

export const TableDetailToggleCell = ({ style, expanded, toggleExpanded }) => (
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

TableDetailToggleCell.propTypes = {
  style: PropTypes.object,
  expanded: PropTypes.bool,
  toggleExpanded: PropTypes.func,
};

TableDetailToggleCell.defaultProps = {
  style: null,
  expanded: false,
  toggleExpanded: () => {},
};
