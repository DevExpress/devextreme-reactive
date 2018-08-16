import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

export const GroupingControl = ({
  align, disabled, onGroup, ...restProps
}) => {
  const invertedAlign = align === 'left';

  return (
    <div
      className={classNames({
        'dx-g-bs4-grouping-control': true,
        'float-right text-right': invertedAlign,
        'float-left text-left': !invertedAlign,
      })}
      onClick={(e) => {
        if (disabled) return;
        e.stopPropagation();
        onGroup();
      }}
      {...restProps}
    >
      <span
        className={classNames({
          'oi oi-list dx-g-bs4-grouping-control-icon': true,
          'dx-g-bs4-cursor-pointer': !disabled,
          'dx-g-bs4-inactive': disabled,
        })}
      />
    </div>
  );
};

GroupingControl.propTypes = {
  onGroup: PropTypes.func.isRequired,
  align: PropTypes.string,
  disabled: PropTypes.bool,
};

GroupingControl.defaultProps = {
  disabled: false,
  align: 'left',
};
