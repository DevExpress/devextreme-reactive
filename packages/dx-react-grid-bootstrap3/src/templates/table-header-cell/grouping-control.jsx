import * as React from 'react';
import * as PropTypes from 'prop-types';

export const GroupingControl = ({
  align, disabled, onGroup, style, ...restProps
}) => {
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
        ...style,
      }}
      {...restProps}
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
  onGroup: PropTypes.func.isRequired,
  align: PropTypes.string,
  disabled: PropTypes.bool,
  style: PropTypes.object,
};

GroupingControl.defaultProps = {
  align: 'left',
  disabled: false,
  style: null,
};
