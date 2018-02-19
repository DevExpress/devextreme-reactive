import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import './grouping-control.css';

export const GroupingControl = ({ align, onGroup }) => {
  const invertedAlign = align === 'left';

  return (
    <div
      className={classNames({
        'dx-rg-bs4-grouping-control': true,
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
        className="oi oi-list dx-rg-bs4-cursor-pointer dx-rg-bs4-grouping-control-icon"
      />
    </div>
  );
};

GroupingControl.propTypes = {
  align: PropTypes.string.isRequired,
  onGroup: PropTypes.func.isRequired,
};
