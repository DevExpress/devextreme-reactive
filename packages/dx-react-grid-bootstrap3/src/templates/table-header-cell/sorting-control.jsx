import * as React from 'react';
import * as PropTypes from 'prop-types';

import { SortingIndicator } from '../parts/sorting-indicator';

const handleMouseDown = (e) => { e.currentTarget.style.outline = 'none'; };
const handleBlur = (e) => { e.currentTarget.style.outline = ''; };

export const SortingControl = ({
  align, sortingDirection, columnTitle, onClick,
}) => {
  const content = [
    <span
      key="title"
      style={{
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}
    >
      {columnTitle}
    </span>,
    sortingDirection && (
      <SortingIndicator
        key="indicator"
        direction={sortingDirection}
        style={{
          visibility: sortingDirection ? 'visible' : 'hidden',
          margin: '0 5px',
          display: 'inline-block',
        }}
      />
    ),
  ];

  return (
    <span
      className={sortingDirection ? 'text-primary' : ''}
      tabIndex={0} // eslint-disable-line jsx-a11y/no-noninteractive-tabindex
      onMouseDown={handleMouseDown}
      onBlur={handleBlur}
      onKeyDown={onClick}
      onClick={onClick}
      style={{
        display: 'inline-flex',
        flexDirection: 'row',
        alignItems: 'center',
        maxWidth: '100%',
      }}
    >
      {align === 'right' ? content.reverse() : content}
    </span>
  );
};

SortingControl.propTypes = {
  align: PropTypes.string.isRequired,
  sortingDirection: PropTypes.oneOf(['asc', 'desc']),
  columnTitle: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

SortingControl.defaultProps = {
  sortingDirection: null,
};
