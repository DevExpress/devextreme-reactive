import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'clsx';

export const GroupButton = ({
  disabled, onGroup, className, style, ...restProps
}) => (
  <i
    className={classNames('glyphicon glyphicon-th-list', className)}
    onClick={(e) => {
      if (disabled) return;
      e.stopPropagation();
      onGroup();
    }}
    style={{
      fontSize: '9px',
      padding: '5px',
      ...(!disabled ? { cursor: 'pointer' } : { opacity: 0.3 }),
      ...style,
    }}
    {...restProps}
  />
);

GroupButton.propTypes = {
  onGroup: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
};

GroupButton.defaultProps = {
  disabled: false,
  className: undefined,
  style: null,
};
