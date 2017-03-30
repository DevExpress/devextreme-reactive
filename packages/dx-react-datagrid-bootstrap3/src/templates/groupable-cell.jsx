import React from 'react';

export const GroupableCell = ({ groupByColumn, children }) => (
  <div style={{ width: '100%', height: '100%' }}>
    <div
      onClick={groupByColumn}
      style={{
        float: 'right',
        width: '30px',
        textAlign: 'right',
      }}
    >[G]</div>
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
