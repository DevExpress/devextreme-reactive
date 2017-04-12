import React from 'react';

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
  children: React.PropTypes.any.isRequired,
  groupByColumn: React.PropTypes.func.isRequired,
};
