import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { SortingIndicator } from '../parts/sorting-indicator';
import './sorting-control.css';

const handleMouseDown = (e) => { e.currentTarget.style.outline = 'none'; };
const handleBlur = (e) => { e.currentTarget.style.outline = ''; };

export const SortingControl = ({
  align, sortingDirection, columnTitle, onClick,
}) =>
  (align === 'right' ? (
    <span
      className={classNames({
        'text-primary': sortingDirection,
        'sorting-control': true,
      })}
      tabIndex={0} // eslint-disable-line jsx-a11y/no-noninteractive-tabindex
      onMouseDown={handleMouseDown}
      onBlur={handleBlur}
      onKeyDown={onClick}
    >
      <SortingIndicator
        direction={sortingDirection}
      />
      &nbsp;
      {columnTitle}
    </span>
  ) : (
    <span
      className={classNames({
        'text-primary': sortingDirection,
        'sorting-control': true,
      })}
      tabIndex={0} // eslint-disable-line jsx-a11y/no-noninteractive-tabindex
      onMouseDown={handleMouseDown}
      onBlur={handleBlur}
      onKeyDown={onClick}
    >
      {columnTitle}
      &nbsp;
      <SortingIndicator
        direction={sortingDirection}
      />
    </span>
  ));

SortingControl.propTypes = {
  align: PropTypes.string.isRequired,
  sortingDirection: PropTypes.oneOf(['asc', 'desc']),
  columnTitle: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

SortingControl.defaultProps = {
  sortingDirection: null,
};
