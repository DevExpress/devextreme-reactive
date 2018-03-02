import * as React from 'react';
import * as PropTypes from 'prop-types';

export const GroupingControl = ({ align, disabled, onGroup }) => {
  const invertedAlign = align === 'left' ? 'right' : 'left';

  return (
    <div
      onClick={(e) => {
        if (disabled) return;
        e.stopPropagation();
        onGroup();
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
          top: '2px',
          fontSize: '9px',
          margin: '-5px',
          padding: '5px',
          ...(!disabled ? { cursor: 'pointer' } : { opacity: 0.3 }),
        }}
      />
    </div>
  );
};

GroupingControl.propTypes = {
  align: PropTypes.string.isRequired,
  onGroup: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

GroupingControl.defaultProps = {
  disabled: false,
};
