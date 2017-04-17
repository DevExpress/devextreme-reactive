import React from 'react';

export const HeaderCell = ({ column, style }) => (
  <th style={style}>{column.title}</th>
);
HeaderCell.defaultProps = {
  style: null,
};
HeaderCell.propTypes = {
  column: React.PropTypes.shape({
    title: React.PropTypes.string,
  }).isRequired,
  style: React.PropTypes.shape(),
};
