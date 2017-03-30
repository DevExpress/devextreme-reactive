import React from 'react';

export const TableDetailToggle = ({ expanded, toggleExpanded }) => (
  <div
    style={{ width: '100%', height: '100%' }}
    onClick={toggleExpanded}
  >
    <i className={`glyphicon glyphicon-triangle-${expanded ? 'bottom' : 'right'}`} />
  </div>
);

TableDetailToggle.propTypes = {
  expanded: React.PropTypes.bool.isRequired,
  toggleExpanded: React.PropTypes.func.isRequired,
};
