import * as React from 'react';
import * as PropTypes from 'prop-types';

export const GroupingControl = ({ align, onGroup }) => {
  const invertedAlign = align === 'left' ? 'right' : 'left';

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onGroup();
      }}
      style={{
        float: invertedAlign,
        textAlign: invertedAlign,
        width: '14px',
      }}
    >
      <span
        className="oi oi-list"
        style={{
          top: '0',
          fontSize: '12px',
          margin: '-5px',
          padding: '5px',
          cursor: 'pointer',
        }}
      />
    </div>
  );
};

GroupingControl.propTypes = {
  align: PropTypes.string.isRequired,
  onGroup: PropTypes.func.isRequired,
};
