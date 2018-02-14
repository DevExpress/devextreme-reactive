import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import './grouping-control.css';

export const GroupingControl = ({ align, onGroup }) => {
  const invertedAlign = align === 'left';

  return (
    <div
      className={classNames({
        'grouping-control': true,
        'float-right': invertedAlign,
        'text-right': invertedAlign,
        'float-left': !invertedAlign,
        'text-left': !invertedAlign,
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
