import React from 'react';
import PropTypes from 'prop-types';

export const GroupableCell = ({ groupByColumn, children }) => (
  <div style={{ width: '100%', height: '100%' }}>
    <div
      onClick={(e) => {
        groupByColumn(e);
        e.stopPropagation();
      }}
      style={{
        float: 'right',
        width: '30px',
        textAlign: 'right',
      }}
    ><i className="glyphicon glyphicon-th-list" /></div>
    <div
      style={{
        paddingRight: '30px',
      }}
    >{children}</div>
  </div>
);

GroupableCell.propTypes = {
  children: PropTypes.any.isRequired,
  groupByColumn: PropTypes.func.isRequired,
};
