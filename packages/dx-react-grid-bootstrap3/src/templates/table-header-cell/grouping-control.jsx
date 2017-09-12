import React from 'react';
import PropTypes from 'prop-types';

export const GroupingControl = ({ align, groupByColumn }) => {
  const invertedAlign = align === 'left' ? 'right' : 'left';

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        groupByColumn();
      }}
      style={{
        float: invertedAlign,
        textAlign: invertedAlign,
        width: '14px',
      }}
    >
      <i
        className="glyphicon glyphicon-th-list"
        style={{
          top: '0',
          fontSize: '9px',
          margin: '-5px',
          padding: '5px',
        }}
      />
    </div>
  );
};

GroupingControl.propTypes = {
  align: PropTypes.string.isRequired,
  groupByColumn: PropTypes.func.isRequired,
};
