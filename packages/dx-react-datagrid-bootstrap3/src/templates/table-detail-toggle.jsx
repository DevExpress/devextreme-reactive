import React from 'react';
import PropTypes from 'prop-types';

export const TableDetailToggle = ({ expanded, toggleExpanded }) => (
  <div
    style={{ width: '100%', height: '100%' }}
    onClick={toggleExpanded}
  >
    <i className={`glyphicon glyphicon-triangle-${expanded ? 'bottom' : 'right'}`} />
  </div>
);

TableDetailToggle.propTypes = {
  expanded: PropTypes.bool.isRequired,
  toggleExpanded: PropTypes.func.isRequired,
};
