import React from 'react';
import PropTypes from 'prop-types';

const handleMouseDown = (e) => {
  e.target.style.outline = 'none';
};
const handleBlur = (e) => {
  e.target.style.outline = '';
};
const handleMouseDownChildren = (e) => {
  const parent = e.currentTarget.parentNode;
  parent.style.outline = 'none';
};

export const TableDetailToggleCell = ({ style, expanded, toggleExpanded }) => {
  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      toggleExpanded();
    }
  };
  return (
    <td
      style={{
        cursor: 'pointer',
        ...style,
      }}
      onClick={() => {
        toggleExpanded();
      }}
      onKeyDown={handleKeyDown}
      onMouseDown={handleMouseDown}
      onBlur={handleBlur}
    >
      <i
        className={`glyphicon glyphicon-triangle-${expanded ? 'bottom' : 'right'}`}
        style={{
          fontSize: '9px',
          top: '0',
        }}
        tabIndex={0} // eslint-disable-line jsx-a11y/no-noninteractive-tabindex
        onMouseDown={handleMouseDownChildren}
      />
    </td>
  );
};

TableDetailToggleCell.propTypes = {
  style: PropTypes.object,
  expanded: PropTypes.bool,
  toggleExpanded: PropTypes.func,
};

TableDetailToggleCell.defaultProps = {
  style: null,
  expanded: false,
  toggleExpanded: () => {},
};
