import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

export const GroupingControl = ({ align, onGroup }) => {
  const invertedAlign = align === 'left';

  return (
    <div
      className={classNames({
        'grouping-control': true,
        'float-left': !invertedAlign,
        'float-right': invertedAlign,
        'text-left': !invertedAlign,
        'text-right': invertedAlign,
      })}
      onClick={(e) => {
        e.stopPropagation();
        onGroup();
      }}
    >
      <span
        className="oi oi-list cursor-pointer grouping-control__span"
      />
    </div>
  );
};

GroupingControl.propTypes = {
  align: PropTypes.string.isRequired,
  onGroup: PropTypes.func.isRequired,
};
