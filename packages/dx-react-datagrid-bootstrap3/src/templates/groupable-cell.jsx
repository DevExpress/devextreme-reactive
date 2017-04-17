import React from 'react';

export const GroupableCell = ({ style, groupByColumn, children }) => (
  <th
    style={style}
  >
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
  </th>
);

GroupableCell.propTypes = {
  children: React.PropTypes.any.isRequired,
  groupByColumn: React.PropTypes.func.isRequired,
};
